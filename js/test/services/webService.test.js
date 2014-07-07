define(['angular', 'angularMocks', 'services/webService'], function(ng, mocks, service) {
    'use strict';

    describe('webService', function() {
        var $httpBackend, webService;

        beforeEach(function() {
            mocks.module('app', function($provide) {
                $provide.constant('searchConfig', {
                    serviceParams: {
                        "api-key": "1234"
                    },
                    endpoint: "http://example.com"
                });
            });

            inject(function($injector) {
                webService = $injector.get('webService');

                $httpBackend = $injector.get('$httpBackend');
                $httpBackend.when('GET', 'http://example.com').respond({ foo: "bar"});
                $httpBackend.when('GET', 'http://fakeurl.com').respond({ foo: "bar"});
            });
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('making a webservice call', function() {
            it("sends a GET request to the web service", function() {
                $httpBackend.expectGET("http://example.com");
                webService.fetch();
                $httpBackend.flush();
            });

            it('sends a GET request with default api config params', function() {
                $httpBackend.expect('GET', 'http://example.com', { "api-key": "1234"});
                webService.fetch();
                $httpBackend.flush();
            });

            it('merges new params with default parameters', function() {
                $httpBackend.expect('GET', 'http://fakeurl.com', { "foo": "bar", "api-key": "1234" });
                webService.fetch({ url: 'http://fakeurl.com', data: { "foo": "bar" } });
                $httpBackend.flush();
            });

            it('removes params that are set to null', function() {
                $httpBackend.expect('GET', 'http://example.com', { "foo": "bar"} );
                webService.fetch({ data: { "foo": "bar", "api-key": null } });
                $httpBackend.flush();
            });

        });

        describe('making a web service call with search params', function() {
           it("send a GET request with our search params", function() {
               $httpBackend.expect('GET', 'http://example.com', { "api-key": "1234", "myParam": "myValue"});
               webService.fetchWith({"myParam": "myValue"});
               $httpBackend.flush();
           });
        });
    });
});
