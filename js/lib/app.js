define(["angular"], function(ng, services) {
    var app =  ng.module('app', []);

    app.constant("serviceConfig", {
        serviceParams: {
            "api-key": "d27aa042f782da4f401d78787ac4bc16:14:67428120"
        },
        endpoint: "http://api.nytimes.com/svc/search/v2/articlesearch"
    });

    return app;

});