angular.module('app.admin.MainCtrl', ['app.admin.MainServ'])
  .controller('MainCtrl', function ($scope, MainServ, LxProgressService) {
    LxProgressService.linear.show('#E91E63', '#progress');

    $scope.getKpi = function () {

      LxProgressService.linear.show('#E91E63', '#progress');

      MainServ.getKpi()
        .then(function (data) {
          $scope.items = data;
          LxProgressService.linear.hide();
        }, function (err) {
          console.log(err);
          LxProgressService.linear.hide();
        });

    };

    $scope.showMe = function () {
      alert('Hello');
    };

    $scope.getKpi();

  });