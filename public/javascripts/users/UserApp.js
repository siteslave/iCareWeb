// Admin app

angular.module('app', [
  'lumx', 'ui.router',
  'app.users.MainCtrl'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/users/partials/main',
        controller: 'MainCtrl'
      })
  });

