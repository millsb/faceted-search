define(['angular', 'app'], function(ng, app) {
    var directive = app.directive('facetKeyword', function() {

        function link(scope, element, attrs) {
            element.on('change', function(event) {
                event.preventDefault();
                // should update some kind of facet value on parent scope
            });
        }
    });

    return directive;

});
