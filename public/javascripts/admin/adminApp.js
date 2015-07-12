// Admin app

angular.module('app', [
  'lumx', 'ui.router',
  'app.admin.MainCtrl'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('admin', {
        url: '/',
        templateUrl: '/admin/partials/main',
        controller: 'MainCtrl'
      })
  });

