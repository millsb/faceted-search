define(["angular", "lodash", "app"], function(ng, _, app) {

    var service = app.factory('webService', function(searchConfig, $http) {

        var baseConfig = function() {
            return {
                method: "get",
                url: searchConfig.endpoint,
                data: searchConfig.serviceParams
            }
        };

        var configure = function(config) {

           // Merge new config with defaults.
           // Any keys that are undefined in config will use the value from baseConfig();
           var config = _.merge({}, baseConfig(), config || {});

           // Delete any keys set to null.
           var config = _.forOwn(config, filterNullValues, config);

           return config;

        };

        // Recursive filter for removing keys with null values.
        var filterNullValues = function(val, key) {
            if (_.isPlainObject(val)) {
                return _.forOwn(val, filterNullValues, val);
            }

            if (val === null) {
                delete this[key];
            }

            return this;
        };

        var fetch = function(config) {
            return $http(configure(config));
        };


        var fetchWith = function(params) {
            return fetch({ data: params });
        };

        return {
            fetch: fetch,
            fetchWith: fetchWith
        }
    });

    return service;
});