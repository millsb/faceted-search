var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
    path = path.replace(/^\/base\//, '').replace(/\.js$/, '');
    return path;
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});

require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    paths: {
        'angular': "bower_components/angular/angular",
        'angularMocks': "bower_components/angular-mocks/angular-mocks",
        'app': "js/lib/app",
        'services': "js/lib/services",
        'test': "js/test"
    },
    packages: [
        { name: "lodash", "location": "bower_components/lodash-amd"}
    ],

    shim: {
        'angular': { 'exports': 'angular' },
        'angularMocks': { deps: ['angular'], exports: 'angular.mock' }
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

