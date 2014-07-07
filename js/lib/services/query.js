define(['app'], function(app) {

   'use strict';

   var service = app.factory('query', function() {

       var collection = {};

       var setParam = function(name, value) {
           collection['name'] = value;

       };

       var getParam = function(name) {
           return collection['name'];
       };

       var removeParam = function(name) {
           delete collection['name'];
       };

       var isParam = function(name) {
           return collection.hasOwnProperty('name');
       };

       return {
           setParam: setParam,
           getParam: getParam,
           removeParam: removeParam,
           isParam: isParam
       };

   });

   return service;
});