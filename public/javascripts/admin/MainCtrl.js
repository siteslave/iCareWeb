angular.module('app.admin.MainCtrl', ['app.admin.MainServ'])
  .controller('MainCtrl', function ($scope, MainServ, LxProgressService, LxDialogService, LxNotificationService) {
    LxProgressService.linear.show('#E91E63', '#progress');


    // set update status
    $scope.isUpdate = false;
    $scope.kpi = {};

    $scope.getKpi = function () {

      LxProgressService.linear.show('#E91E63', '#progress');

      MainServ.getBase()
        .then(function (data) {
            $scope.categories = data.categories;
            return MainServ.getKpi();
        })
        .then(function (data) {
          $scope.items = data;
          LxProgressService.linear.hide();
        }, function (err) {
          console.log(err);
          LxProgressService.linear.hide();
        });

    };

    $scope.newItem = function () {
      $scope.isUpdate = false;
      $scope.kpi.number_id = null;
      $scope.kpi.item_name = null;
      $scope.kpi.pass_score = 80;
      $scope.kpi.moph = false;
      $scope.kpi.region = false;
      $scope.kpi.province = false;
      $scope.kpi.item_status = false;
      $scope.kpi.item_type = false;
      $scope.kpi.chart_front = false;

      LxDialogService.open('mdlNewItem');
    };

    $scope.edit = function (id) {
      MainServ.getKpiDetail(id)
        .then(function (data) {
          $scope.kpi.number_id = data.number_id;
          $scope.kpi.item_name = data.item_name;
          $scope.kpi.pass_score = data.pass_score;
          $scope.kpi.moph = data.moph == 'Y' ? true : false;
          $scope.kpi.region = data.region == 'Y' ? true : false;
          $scope.kpi.province = data.province == 'Y' ? true : false;
          $scope.kpi.item_status = data.item_status == 'Y' ? true : false;
          $scope.kpi.item_type = data.item_type == '1' ? true : false;
          $scope.kpi.chart_front = data.chart_front == 'Y' ? true : false;

          if (data.category_name) {
            $scope.kpi.selectedCategory = {id: data.category_id, category_name: data.category_name};
            $scope.kpi.category_id = data.category_id;
          } else {
            $scope.kpi.selectedCategory = { id: $scope.categories[0].id, category_name: $scope.categories[0].category_name };
            $scope.kpi.category_id = $scope.categories[0].id;
          }

          $scope.isUpdate = true;
          LxDialogService.open('mdlNewItem');
        }, function (err) {
          console.log(err);
        });

    };

    $scope.save = function () {

      var data = {};
      data.number_id = $scope.kpi.number_id;
      data.item_type = $scope.kpi.item_type == true ? '1' : '2';
      data.pass_score = $scope.kpi.pass_score;
      data.chart_front = $scope.kpi.chart_front == true ? 'Y' : 'N';
      data.item_name = $scope.kpi.item_name;
      data.item_status = $scope.kpi.item_status == true ? 'Y' : 'N';
      data.moph = $scope.kpi.moph == true ? 'Y' : 'N';
      data.region = $scope.kpi.region == true ? 'Y' : 'N';
      data.province = $scope.kpi.province == true ? 'Y' : 'N';
      data.category_id = $scope.kpi.category_id;

      // console.log(data);
      // console.log($scope.isUpdate);
      //
      if ($scope.isUpdate) {
        // Update
        MainServ.update(data)
          .then(function () {
            LxNotificationService.success('ปรับปรุงข้อมูลเสร็จเรียบร้อยแล้ว');
            LxDialogService.close('mdlNewItem');
            $scope.getKpi();
          }, function (err) {
            if (!angular.isObject(err)) {
              LxNotificationService.error(err);
            } else {
              LxNotificationService.error('เกิดข้อผิดพลาด');
              console.log(err);
            }
          });
      } else {
        MainServ.save(data)
          .then(function () {
            LxNotificationService.success('บันทึกรายการเสร็จเรียบร้อยแล้ว');
            LxDialogService.close('mdlNewItem');
            $scope.getKpi();
          }, function (err) {
            if (!angular.isObject(err)) {
              LxNotificationService.error(err);
            } else {
              LxNotificationService.error('เกิดข้อผิดพลาด');
              console.log(err);
            }
          });
      }
    };

    // Set category selected
    $scope.setCategory = function (data) {
      //console.log(data.selected[0]);
      $scope.kpi.category_id = data.selected[0].id;
    }

    $scope.remove = function (id, name) {
      LxNotificationService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการนี้ใช่หรือไม่? ['+ name +']',
        { ok: 'ใช่, ฉันต้องการลบ', cancel: 'ยกเลิก'},
        function (res) {
          if (res) {
            console.log(id);
            MainServ.remove(id)
              .then(function () {
                LxNotificationService.success('ลบรายการเสร็จเรียบร้อยแล้วครับ');
                $scope.getKpi();
              }, function (err) {
                if (!angular.isObject(err)) {
                  LxNotificationService.error(err);
                } else {
                  LxNotificationService.error('เกิดข้อผิดพลาด');
                  console.log(err);
                }
              });
          }
       });
    };

    $scope.getKpi();

  });
