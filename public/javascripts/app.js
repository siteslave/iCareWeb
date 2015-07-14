// Main application module

angular.module('app', [
  'lumx', 'ui.router', 'highcharts-ng',
  'app.main.MainCtrl', 'app.main.ResultProvinceCtrl'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/partials/main',
        controller: 'MainCtrl'
      })
      .state('report-province', {
        url: '/report-province/:id',
        templateUrl: '/partials/result/province',
        controller: 'ResultProvinceCtrl'
      });

  });