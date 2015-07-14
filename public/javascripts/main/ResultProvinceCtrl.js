angular.module('app.main.ResultProvinceCtrl', ['app.main.MainServ'])
  .controller('ResultProvinceCtrl', function ($scope, $filter, $stateParams, MainServ, LxProgressService) {

    var kpi_id = $stateParams.id;
    $scope.isShowSubReport = false;

    $scope.getResult = function () {

      LxProgressService.linear.show('#E91E63', '#progress');

      // Get detail
      MainServ.getDetail(kpi_id)
        .then(function (detail) {
          $scope.kpi = detail;
          return MainServ.getResultProvince(kpi_id);
        })
        .then(function (rows) {
          $scope.items = rows;
          $scope.setChart(rows);
          LxProgressService.linear.hide();
        }, function (err) {
          console.log(err);
          LxProgressService.linear.hide();
        });
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'column'
        }
      },
      series: [{
        name: 'ผลงาน',
        //data: [10, 15, 12, 8]
        data: []
      }],
      title: {
        text: ''
      },
      xAxis: {
        //categories: ['ร้อยเอ็ด', 'ขอนแก่น', 'มหาสารคาม', 'กาฬสินธุ์'],
        categories: [],
        title: {
          text: 'จังหวัด'
        }
      },
      tooltip: {
        pointFormat: "{point.y:.2f}"
      },
      yAxis: {
        max: 100,
        title: {
          text: 'ร้อยละ (%)'
        },
        plotLines: [{
          value: 90,
          color: 'red',
          dashStyle: 'longdashdot',
          width: 1,
          label: {
            text: 'เกณฑ์มาตรฐาน: 90%',
            align: 'center',
            style: {
              color: 'gray'
            }
          }
        }]
      },
      loading: false
    };

    $scope.setChart = function (data) {
      $scope.chartConfig.title.text = $scope.kpi.item_name;
      $scope.chartConfig.yAxis.plotLines[0].value = $scope.kpi.pass_score;
      $scope.chartConfig.yAxis.plotLines[0].label.text = 'เกณฑ์มาตรฐาน ' + $scope.kpi.pass_score + '%';

      angular.forEach (data, function (v) {
        var score = 0;
        if (angular.isNumber(v.result) && angular.isNumber(v.target)) {
          score = parseFloat($filter('number')((v.result * 100) / v.target, 2));
        }
        $scope.chartConfig.series[0].data.push(score);
        $scope.chartConfig.xAxis.categories.push(v.prov_name);
      });

      console.log($scope.chartConfig);
    };

    $scope.showSubReport = function (province) {
      $scope.isShowSubReport = true;
      $scope.txtProvince = province;
    };

    $scope.getResult();

  });