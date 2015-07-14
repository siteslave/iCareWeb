angular.module('app.users.MainCtrl', ['app.users.MainServ'])
  .controller('MainCtrl', function ($scope, MainServ, LxDialogService, LxProgressService, LxNotificationService) {

    $scope.getList = function () {
      LxProgressService.linear.show('#E91E63', '#progress');
      MainServ.getKpi()
        .then(function (rows) {
          $scope.items = rows;
          LxProgressService.linear.hide();
        }, function (err) {
          console.log(err);
          LxProgressService.linear.hide();
        });
    };

    $scope.kpi = {};

    $scope.report = function (id, name, target, result) {
      $scope.kpi.kpi_id = id;
      $scope.kpi.item_name = name;
      $scope.kpi.target = target;
      $scope.kpi.result = result;

      $scope.kpi.date = new Date();

      LxDialogService.open('mdlReport');
    };

    $scope.save = function () {

      if (!$scope.kpi.target || $scope.target <= 0) {
        LxNotificationService.error('กรุณาระบุเป้าหมาย');
      } else if (!$scope.kpi.result || $scope.result <= 0) {
        LxNotificationService.error('กรุณาระบุผลงาน');
      } else if (!$scope.kpi.date) {
        LxNotificationService.error('กรุณาระบุวันที่ตัดยอดข้อมูล');
      } else {

        LxProgressService.linear.show('#E91E63', '#progress');

        var data = {};
        data.year = moment($scope.kpi.date).get('year') + 543;
        data.month = moment($scope.kpi.date).get('month') + 1;
        data.result = $scope.kpi.result;
        data.target = $scope.kpi.target;
        data.kpi_id = $scope.kpi.kpi_id;

        MainServ.update(data)
          .then(function () {
            LxNotificationService.success('บันทึกรายการเสร็จเรียบร้อยแล้ว');
            $scope.getList();
            LxDialogService.close('mdlReport');
            LxProgressService.linear.hide();
          }, function (err) {
            if (angular.isObject(err)) {
              LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
              console.log(err);
              LxProgressService.linear.hide();
            } else {
              LxNotificationService.error(err);
              LxProgressService.linear.hide();
            }
          });

      }
    };

    $scope.getList();

  });