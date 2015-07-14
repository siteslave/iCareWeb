angular.module('app.admin.UserCtrl', ['app.admin.UserServ'])
  .controller('UserCtrl', function ($scope, UserServ, LxDialogService, LxNotificationService) {

    $scope.isUpdate = false;
    $scope.user = {};
    $scope.changepass = {};

    UserServ.getProvince()
      .then(function (data) {
        $scope.provinces = data;
      });

    UserServ.getUserType()
      .then(function (data) {
        $scope.types = data;
      });

    $scope.getList = function () {
      UserServ.list()
        .then(function (rows) {
          $scope.users = rows;
        }, function (err) {
          console.log(err);
        });
    };

    $scope.edit = function (username, fullname, is_active, user_type, user_type_name, prov_code, prov_name) {

      $scope.isUpdate = true;
      $scope.user.username = username;
      $scope.user.fullname = fullname;
      $scope.user.is_active = is_active == 'Y';
      $scope.user.selectedType = {id: user_type, user_type_name: user_type_name};
      $scope.user.selectedProvince = {prov_code: prov_code, prov_name: prov_name};

      $scope.user.user_type = user_type;
      $scope.user.province = prov_code;

      LxDialogService.open('mdlNewItem');

    };

    $scope.save = function () {

      var user = {};
      user.username = $scope.user.username;
      user.fullname = $scope.user.fullname;
      user.password = $scope.user.password;
      user.is_active = $scope.user.is_active == true ? 'Y' : 'N';
      user.user_type = $scope.user.user_type;
      user.province = $scope.user.province;

      if (!user.username || !user.fullname || !user.province || !user.user_type) {
        LxNotificationService.error('ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ');
      } else if ($scope.user.password != $scope.user.password2) {
        LxNotificationService.error('รหัสผ่านไม่ตรงกัน');
      } else {
        var promise = null;
        if ($scope.isUpdate) {
          promise = UserServ.update(user);
        } else {
          promise = UserServ.save(user);
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

    $scope.setData = {
      setProvince: function (data) {
        $scope.user.province = data.selected[0].prov_code;
      },
      setType: function (data) {
        $scope.user.user_type = data.selected[0].id;
      }
    };

    $scope.showNew = function () {
      $scope.isUpdate = false;
      $scope.user.username = null;
      $scope.user.fullname = null;
      $scope.user.password = null;
      $scope.user.password2 = null;
      $scope.user.is_active = false;

      $scope.user.user_type = $scope.types[0].id;
      $scope.user.province = $scope.provinces[0].prov_code;

      $scope.user.selectedType = {id: $scope.types[0].id, user_type_name: $scope.types[0].user_type_name};
      $scope.user.selectedProvince = {prov_code: $scope.provinces[0].prov_code, prov_name: $scope.provinces[0].prov_name};
      LxDialogService.open('mdlNewItem');
    };

    $scope.showChangePassword = function (username) {
      $scope.changepass.password = null;
      $scope.changepass.password2 = null;
      $scope.changepass.username = username;
      LxDialogService.open('mdlChangePassword');
    };

    $scope.changePassword = function () {

      var username = $scope.changepass.username;
      var password = $scope.changepass.password;

      if ($scope.changepass.password != $scope.changepass.password2) {
        LxNotificationService.error('รหัสผ่านไม่ตรงกัน');
      } else {
        if (!username || !password) {
          LxNotificationService.error('กรุณาระบุข้อมูลให้ครบถ้วน')
        } else {
          UserServ.changePassword(username, password)
            .then(function () {
              LxNotificationService.success('บันทึกรายการเสร็จเรียบร้อยแล้ว');
              LxDialogService.close('mdlChangePassword');
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
      }

    };

    $scope.remove = function (username, fullname) {
      LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่? ['+ fullname +']',
        {ok: 'ใช่, ฉันต้องการลบ', cancel: 'ไม่ใช่'}, function (res) {
          if (res) {
            UserServ.remove(username)
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