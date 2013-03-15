'use strict';

/* Controllers */

var BASE_URL = 'http://localhost:9090/',
    loadStatusOn = ' (loading...)',
    loadStatusOff = '';

function MainCtrl($scope, $http, $stateParams, $state, $timeout) {
  $scope.endTime = Date.now();
  $scope.startTime = $scope.endTime - 3600000;
  $scope.setTimeRange = function(v) {
    $scope.endTime = Date.now();
    $scope.startTime = $scope.endTime - parseInt(v, 10);
    $scope.$broadcast('timeChanged', $scope.startTime, $scope.endTime);
  };
  $scope.dataSeries = [];
  $scope.removeDataSeries = function() {
    var newDataSeries = [];
    $scope.dataSeries.forEach(function(d) {
      if (d.id !== this.series.id) {
        newDataSeries.push(d);
      }
    }, this);
    $scope.dataSeries = newDataSeries;
    $scope.$broadcast('seriesRemoved', this.series.id);
    console.log('removed: ' + this.series.id);
  };

  // full reload all current data
  $scope.fullDataReload = function() {
    var dataCopy = $scope.dataSeries.concat();
    $scope.dataSeries = [];
    $timeout(function() {
      $scope.$broadcast('seriesLoading', 'all');
    }, 0);
    dataCopy.forEach(function(d) {
      $scope.loadMetrics(d.entityId, d.checkId, d.metricName);
    });
  };

  $scope.$on('timeChanged', $scope.fullDataReload);

  $scope.loadMetrics = function(entityId, checkId, metricName) {
    var url, metricId;

    url = BASE_URL +
      'entities/' + entityId +
      '/checks/' + checkId +
      '/metrics/' + metricName +
      '/plot?' +
      '&resolution=FULL' +
      '&from=' + $scope.startTime +
      '&to=' + $scope.endTime;
    metricId = [entityId, checkId, metricName].join('/');
    $scope.$broadcast('seriesLoading', metricId);

    // appnd new data source config for each metric that is loaded
    $http.get(url).success(function(data) {
      console.log('loading data for: ' + metricId);
      $scope.dataSeries.push({
        title: metricId,
        id: metricId,
        entityId: entityId,
        checkId: checkId,
        metricName: metricName,
        data: data.values,
        dimensions: {
          x: 'timestamp',
          y: 'average'
        }
      });
      console.log('done loading: ' + metricId);
    });
  };

}
MainCtrl.$inject = ['$scope', '$http', '$stateParams', '$state', '$timeout'];

function EntityListCtrl($scope, $http, $stateParams, $state) {
  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = loadStatusOn;
  $http.get(BASE_URL + 'entities').success(function(data) {
    $scope.entities = data.values;
    $scope.loadStatus = loadStatusOff;
  });
  if ($stateParams) {
    $scope.entityId = $stateParams.entityId || null;
  }
}
EntityListCtrl.$inject = ['$scope', '$http', '$stateParams', '$state'];

function CheckListCtrl($scope, $http, $stateParams, $state) {
  var url = BASE_URL + 'entities/' + $stateParams.entityId + '/checks';
  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = loadStatusOn;
  $http.get(url).success(function(data) {
    $scope.checks = data.values;
    $scope.loadStatus = loadStatusOff;
  });
  if ($stateParams) {
    $scope.entityId = $stateParams.entityId || null;
    $scope.checkId = $stateParams.checkId || null;
  }
}
CheckListCtrl.$inject = ['$scope', '$http', '$stateParams', '$state'];

function MetricListCtrl($scope, $http, $stateParams, $state) {
  var url, metricId, metricValues;

  delete $http.defaults.headers.common['X-Requested-With'];
  url = BASE_URL + 'entities/' + $stateParams.entityId +
    '/checks/' + $stateParams.checkId + '/metrics';
  $scope.loadStatus = loadStatusOn;
  $http.get(url).success(function(data) {
    $scope.metrics = data.values;
    $scope.loadStatus = loadStatusOff;
  });
  $scope.entityId = $stateParams.entityId;
  $scope.checkId = $stateParams.checkId;

  if (!$stateParams.metricName) {
    return;
  }

  $scope.loadMetrics($stateParams.entityId,
      $stateParams.checkId,
      $stateParams.metricName);
}
MetricListCtrl.$inject = ['$scope', '$http', '$stateParams', '$state'];











function MetricPlotCtrl($scope, $http, $stateParams, $state) {
  var now = Date.now(),
    oneHour = 1000*60*60,
    url = BASE_URL +
    'entities/' + $stateParams.entityId +
    '/checks/' + $stateParams.checkId +
    '/metrics/' + $stateParams.metricName +
    '/plot?' +
    '&resolution=FULL' +
    '&from=' + (now - oneHour) +
    '&to=' + now;

  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = loadStatusOn;
  $http.get(url).success(function(data) {
    $scope.values = data.values;
    $scope.loadStatus = loadStatusOff;
  });
  $scope.entityId = $stateParams.entityId;
  $scope.checkId = $stateParams.checkId;
  $scope.metricName = $stateParams.metricName;
}
MetricPlotCtrl.$inject = ['$scope', '$http', '$stateParams', '$state'];

function AlarmListCtrl($scope, $http, $routeParams) {
  var url = BASE_URL + 'entities/' + $routeParams.entityId + '/alarms';
  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = 'loading...';
  $http.get(url).success(function(data) {
    $scope.alarms = data.values;
    $scope.loadStatus = 'loaded';
  });
  $scope.entityId = $routeParams.entityId;
}
AlarmListCtrl.$inject = ['$scope', '$http', '$routeParams'];

function AlarmDetailCtrl($scope, $http, $routeParams) {
  var url = BASE_URL + 'entities/' + $routeParams.entityId + '/alarms/' +
    $routeParams.alarmId;
  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = 'loading...';
  $http.get(url).success(function(data) {
    $scope.alarm = data;
    $scope.loadStatus = 'loaded';
  });
}
AlarmDetailCtrl.$inject = ['$scope', '$http', '$routeParams'];
