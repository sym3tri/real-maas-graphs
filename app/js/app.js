'use strict';

// Declare app level module which depends on filters, and services
angular.module('dashboard',
  ['ui.compat', 'dashboard.filters', 'dashboard.services', 'dashboard.directives'])
  .config(['$routeProvider', '$urlRouterProvider', '$stateProvider',
    function($routeProvider, $urlRouterProvider, $stateProvider) {

      $stateProvider
      .state('grapher', {
        url: '/grapher',
        abstract: true,
      })
      .state('grapher.entities', {
        url: '/entities',
        views: {
          'entityselector@': {
            controller: EntityListCtrl,
            templateUrl: 'partials/entity-list.html'
          }
        }
      })
      .state('grapher.entity', {
        url: '/entities/{entityId}',
        views: {
          'entityselector@': {
            controller: EntityListCtrl,
            templateUrl: 'partials/entity-list.html'
          }
        }
      })
      .state('grapher.entity.checks', {
        url: '/checks',
        views: {
          'checkselector@': {
            controller: CheckListCtrl,
            templateUrl: 'partials/check-list.html'
          }
        }
      })
      .state('grapher.entity.check', {
        url: '/checks/{checkId}',
        views: {
          'checkselector@': {
            controller: CheckListCtrl,
            templateUrl: 'partials/check-list.html'
          }
        }
      })
      .state('grapher.entity.check.metrics', {
        url: '/metrics',
        views: {
          'metricselector@': {
            controller: MetricListCtrl,
            templateUrl: 'partials/metric-list.html'
          }
        }
      })
      .state('grapher.entity.check.metric', {
        url: '/metrics/{metricName}',
        views: {
          'metricselector@': {
            controller: MetricListCtrl,
            templateUrl: 'partials/metric-list.html'
          }
        }
      })
      .state('grapher.entity.check.metric.plot', {
        url: '/plot',
        controller: MetricPlotCtrl,
        template: ''
      });

  }])
 .run(
    ['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }]);
