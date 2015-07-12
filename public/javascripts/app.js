// Main application module
angular.module('app', [
  'lumx', 'ui.router', 'highcharts-ng',
  'app.main.MainCtrl'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/partials/main',
        controller: 'MainCtrl'
      });

  });