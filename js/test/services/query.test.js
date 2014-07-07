define(['angular', 'angularMocks', 'services/query'], function(ng, mocks) {

    'use strict';

    describe('query', function() {
        var query;

        beforeEach(function() {
            module('app');

            inject(function($injector) {
                query = $injector.get('query');
            });
        });

        describe('get/set params', function() {
            it('sets a parameter by name and gets it', function() {
                query.setParam('foo', 'bar');
                var result = query.getParam('foo');
                expect(result).toEqual('bar');
            });

            it('returns undefined if no parameter set', function() {
                var result = query.getParam('baz');
                expect(result).not.toBeDefined();
            });

            it('overwrites the value of an existing parameter', function() {
                query.setParam('foo', 'bar');
                expect(query.getParam('foo')).toEqual('bar');
                query.setParam('foo', 'baz');
                expect(query.getParam('foo')).toEqual('baz');
            });
        });

        describe('checking for param', function() {
            it('is true if param exists', function() {
                query.setParam('foo', 'bar');
                expect(query.isParam('foo')).toEqual(true);
            });

            it('is false if a param does not exist', function() {
                expect(query.isParam('foo')).toEqual(false);
            });
        });

        describe('remove param', function() {
            it('deletes the param from the collection', function() {
                query.setParam('foo', 'bar');
                expect(query.isParam('foo')).toEqual(true);
                query.removeParam('foo');
                expect(query.isParam('foo')).not.toEqual(true);
            });
        });


    });

});