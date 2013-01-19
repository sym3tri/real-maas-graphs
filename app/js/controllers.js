'use strict';

/* Controllers */

var BASE_URL = 'http://localhost:8080/';

function EntityListCtrl($scope, $http) {
  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = 'loading...';
  $http.get(BASE_URL + 'entities').success(function(data) {
    $scope.entities = data.values;
    $scope.loadStatus = 'loaded';
  });
}
EntityListCtrl.$inject = ['$scope', '$http'];

function CheckListCtrl($scope, $http, $routeParams) {
  var url = BASE_URL + 'entities/' + $routeParams.entityId + '/checks';
  delete $http.defaults.headers.common['X-Requested-With'];
  $scope.loadStatus = 'loading...';
  $http.get(url).success(function(data) {
    $scope.checks = data.values;
    $scope.loadStatus = 'loaded';
  });
  $scope.entityId = $routeParams.entityId;
}
CheckListCtrl.$inject = ['$scope', '$http', '$routeParams'];

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
