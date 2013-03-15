'use strict';

/* Directives */

angular.module('dashboard.directives', [])

.directive('appVersion', ['version', function(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}])

.directive('glGraph', function() {
  return {
    link: function(scope, elm, attrs) {

      var graph, colorGenerator;

      // a simple d3 color generator. this can be any fn that returns
      // colors based on input
      colorGenerator = d3.scale.category20();

      // instantiate the graph and render it.
      // put it into the "emtpy" state by default.
      graph = glimpse.graphBuilder.create('line')
        .state('empty')
        .render(elm[0]);

      // for easy debugging
      window.graph = scope.graph = graph;

      // called whenever the graph needs to be updated
      function updateGraph() {
        var dataSeries;

        // conditionally display "empty" state
        dataSeries = scope.dataSeries || [];
        if (dataSeries.length === 0) {
          graph.state('empty');
          return;
        }

        // add color function for each data source
        dataSeries = dataSeries.map(function(ds) {
          ds.color = function() {
            return colorGenerator(ds.id);
          };
          return ds;
        });

        // set the new data.
        // put into "normal" state so the graph displays normally.
        // call update() so the changes take effect.
        graph.data(dataSeries)
          .state('normal')
          .update();
      }

      // call update() when the global dataSeries changes
      scope.$watch(
        function() {
          return scope.dataSeries.length;
        }, updateGraph);

      // remove the data source by id when remove button is clicked
      scope.$on('seriesRemoved', function(e, id) {
        graph.data().remove(id);
        console.log('data/component removed. id: ' + id);
      });

      // show loading screen when loading event is fired
      scope.$on('seriesLoading', function(e, id) {
        console.log('loading... ' + id);
        graph.state('loading');
      });

    }
  };
});


