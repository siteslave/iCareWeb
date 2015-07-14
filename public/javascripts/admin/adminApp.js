// Admin app

angular.module('app', [
  'lumx', 'ui.router', 'app.filters.Filters',
  'app.admin.MainCtrl',
  'app.admin.CategoriesCtrl',
  'app.admin.UserCtrl'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/admin/partials/main',
        controller: 'MainCtrl'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: '/admin/partials/categories',
        controller: 'CategoriesCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: '/admin/partials/users',
        controller: 'UserCtrl'
      })
  });

