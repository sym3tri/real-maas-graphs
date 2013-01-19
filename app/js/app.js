'use strict';


// Declare app level module which depends on filters, and services
angular.module('dashboard',
  ['dashboard.filters', 'dashboard.services', 'dashboard.directives'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/entities', {
      templateUrl: 'partials/entity-list.html',
      controller: EntityListCtrl
    });
    $routeProvider.when('/entities/:entityId/checks', {
      templateUrl: 'partials/check-list.html',
      controller: CheckListCtrl
    });
    $routeProvider.when('/entities/:entityId/alarms', {
      templateUrl: 'partials/alarm-list.html',
      controller: AlarmListCtrl
    });
    $routeProvider.when('/entities/:entityId/alarms/:alarmId', {
      templateUrl: 'partials/alarm-detail.html',
      controller: AlarmDetailCtrl
    });
    $routeProvider.otherwise({ redirectTo: '/entities' });
  }]);
