angular.module('app.admin.CategoriesCtrl', ['app.admin.CategoriesServ'])
  .controller('CategoriesCtrl', function ($scope, CategoriesServ, LxDialogService, LxNotificationService) {

    $scope.isUpdate = false;
    $scope.category = {};

    $scope.getList = function () {
      CategoriesServ.list()
        .then(function (rows) {
          $scope.items = rows;
        }, function (err) {
          console.log(err);
        });
    };

    $scope.edit = function (id, name) {

      $scope.isUpdate = true;
      $scope.category.id = id;
      $scope.category.name = name;
      LxDialogService.open('mdlNewItem');

    };

    $scope.save = function () {

      var name = $scope.category.name;
      var id = $scope.category.id;

      if (!name) {
        LxNotificationService.error('กรุณาระบุชื่อของหมวดหมู่');
      } else {
        var promise = null;
        if ($scope.isUpdate) {
          promise = CategoriesServ.update(id, name);
        } else {
          promise = CategoriesServ.save(name);
        }

        promise
          .then(function () {
            LxNotificationService.success('บันทึกรายการเสร็จเรียบร้อยแล้ว');
            LxDialogService.close('mdlNewItem');
            $scope.getList();
          }, function (err) {
            if (angular.isObject(err)) {
              LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
              console.log(err);
            } else {
              LxNotificationService.error(err);
            }
          });
      }

    };

    $scope.showNew = function () {
      $scope.isUpdate = false;
      $scope.category.id = null;
      $scope.category.name = null;
      LxDialogService.open('mdlNewItem');
    };

    $scope.remove = function (id, name) {
      LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่? ['+ name +']',
        {ok: 'ใช่, ฉันต้องการลบ', cancel: 'ไม่ใช่'}, function (res) {
          if (res) {
            CategoriesServ.remove(id)
              .then(function () {
                LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้ว');
                $scope.getList();
              }, function (err) {
                if (angular.isObject(err)) {
                  LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                  console.log(err);
                } else {
                  LxNotificationService.error(err);
                }
              });
          }
        });
    };

    $scope.getList();

  });