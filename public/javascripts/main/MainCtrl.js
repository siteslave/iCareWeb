// Main Controller
angular.module('app.main.MainCtrl', ['app.main.MainServ'])
  .controller('MainCtrl', function ($scope, $filter, MainServ, LxProgressService) {

    LxProgressService.linear.show('#E91E63', '#progress');

    $scope.filters = {};
    $scope.samples = [];

    MainServ.getSample()
      .then(function (rows) {
        //var data = _.pluck(_.sample(rows, 3), 'number_id');
        var data = _.sample(rows, 3);

        MainServ.getChartSample(data)
          .then(function (charts) {
            $scope.setChart(charts);
            console.log(charts);
          }, function (err) {
            console.log(err);
          });
      });

    $scope.setChart = function (charts) {

      $scope.chartConfig0.title.text = charts[0].name;
      $scope.chartConfig0.yAxis.plotLines[0].value = charts[0].pass_score;
      $scope.chartConfig0.yAxis.plotLines[0].label.text = 'เกณฑ์มาตรฐาน ' + charts[0].pass_score + '%';

      angular.forEach (charts[0].data, function (v) {
        var score = 0;
        if (angular.isNumber(v.result) && angular.isNumber(v.target)) {
          score = parseFloat($filter('number')((v.result * 100) / v.target, 2));
        }
        $scope.chartConfig0.series[0].data.push(score);
        $scope.chartConfig0.xAxis.categories.push(v.prov_name);
      });

      $scope.chartConfig1.title.text = charts[1].name;
      $scope.chartConfig1.yAxis.plotLines[0].value = charts[1].pass_score;
      $scope.chartConfig1.yAxis.plotLines[0].label.text = 'เกณฑ์มาตรฐาน ' + charts[1].pass_score + '%';

      angular.forEach (charts[1].data, function (v) {
        var score = 0;
        if (angular.isNumber(v.result) && angular.isNumber(v.target)) {
          score = parseFloat($filter('number')((v.result * 100) / v.target, 2));
        }
        $scope.chartConfig1.series[0].data.push(score);
        $scope.chartConfig1.xAxis.categories.push(v.prov_name);
      });

    };


    MainServ.getBase()
      .then(function (data) {
        $scope.categories = data.categories;
        $scope.categories.push({id: 0, category_name: 'ทั้งหมด'});
        $scope.selectedCategory = data.categories[0];
        $scope.filters.category = data.categories[0];

        //$scope.years = data.years;
        //$scope.selectedYear = data.years[0];
        //$scope.filters.year = data.years[0];

        data.itemType.push({id: '0', type_name: 'ทั้งหมด'});
        $scope.types = data.itemType;

        $scope.selectedType = data.itemType[0];
        $scope.filters.type = data.itemType[0];

        //$scope.provinces = data.provinces;
        //$scope.selectedProvince = data.provinces[0];
        //$scope.filters.province = data.provinces[0];

        LxProgressService.linear.hide();
        // Initial kpi list
        $scope.getKpi();

      }, function (err) {
        console.log(err);
        LxProgressService.linear.hide();
      });

    $scope.getKpi = function () {

      LxProgressService.linear.show('#E91E63', '#progress');

      var c = $scope.filters.category.id;
      var t = $scope.filters.type.id;
      //var p = $scope.filters.province.prov_code;
      //var y = $scope.filters.year.year_code;

      MainServ.getKpi(c, t)
        .then(function (data) {
          $scope.items = data;
          LxProgressService.linear.hide();
        }, function (err) {
          console.log(err);
          LxProgressService.linear.hide();
        });
    };

    $scope.setData = {
      setType: function (data) {
        $scope.filters.type = data.selected[0];
        $scope.getKpi();
      },
      setCategory: function (data) {
        $scope.filters.category = data.selected[0];
        $scope.getKpi();
      },
      setYear: function (data) {
        $scope.filters.year = data.selected[0];
      },
      setProvince: function (data) {
        $scope.filters.province = data.selected[0];
      }
    };

    $scope.chartConfig0 = {
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
        text: 'ตัวชี้วัด'
      },
      xAxis: {
        categories: [],
        title: {
          text: 'จังหวัด'
        }
      },
      yAxis: {
        title: {
          text: 'ร้อยละ (%)'
        },
        max: 100,
        plotLines: [{
          value: 18,
          color: 'red',
          dashStyle: 'longdashdot',
          width: 1,
          label: {
            text: 'เกณฑ์มาตรฐาน: xx%',
            align: 'center',
            style: {
              color: 'gray'
            }
          }
        }]
      },
      loading: false
    };

    $scope.chartConfig1 = {
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
        text: 'ตัวชี้วัด'
      },
      xAxis: {
        categories: [],
        title: {
          text: 'จังหวัด'
        }
      },
      yAxis: {
        title: {
          text: 'ร้อยละ (%)'
        },
        max: 100,
        plotLines: [{
          value: 18,
          color: 'red',
          dashStyle: 'longdashdot',
          width: 1,
          label: {
            text: 'เกณฑ์มาตรฐาน: xx%',
            align: 'center',
            style: {
              color: 'gray'
            }
          }
        }]
      },
      loading: false
    };


    //
    //
    //$scope.chartConfig = {
    //  options: {
    //    chart: {
    //      type: 'solidgauge'
    //    },
    //    pane: {
    //      center: ['50%', '88%'],
    //      size: '150%',
    //      startAngle: -90,
    //      endAngle: 90,
    //      background: {
    //        backgroundColor:'#EEE',
    //        innerRadius: '60%',
    //        outerRadius: '100%',
    //        shape: 'arc'
    //      }
    //    },
    //    solidgauge: {
    //      dataLabels: {
    //        y: -10,
    //        borderWidth: 0,
    //        useHTML: false
    //      }
    //    }
    //  },
    //  series: [{
    //    data: [10]
    //  }],
    //  title: {
    //    text: 'อัตราตายจากอุบัติเหตุทางถนน',
    //    y: 50
    //  },
    //  yAxis: {
    //    currentMin: 0,
    //    currentMax: 100,
    //    title: {
    //      y: 5
    //    },
    //    stops: [
    //      [0.1, '#D32F2F'], // red
    //      [0.5, '#C6FF00'], // yellow
    //      [0.9, '#2196F3'] // green
    //    ],
    //    lineWidth: 0,
    //    tickInterval: 10,
    //    tickPixelInterval: 400,
    //    tickWidth: 0,
    //    labels: {
    //      y: 0.2
    //    }
    //  },
    //  loading: false
    //};
    //$scope.chartConfig1 = {
    //  options: {
    //    chart: {
    //      type: 'solidgauge'
    //    },
    //    pane: {
    //      center: ['50%', '88%'],
    //      size: '150%',
    //      startAngle: -90,
    //      endAngle: 90,
    //      background: {
    //        backgroundColor:'#EEE',
    //        innerRadius: '60%',
    //        outerRadius: '100%',
    //        shape: 'arc'
    //      }
    //    },
    //    solidgauge: {
    //      dataLabels: {
    //        y: -10,
    //        borderWidth: 0,
    //        useHTML: false
    //      }
    //    }
    //  },
    //  series: [{
    //    data: [80]
    //  }],
    //  title: {
    //    text: 'อัตราตายจากอุบัติเหตุทางถนน',
    //    y: 50
    //  },
    //  yAxis: {
    //    currentMin: 0,
    //    currentMax: 100,
    //    title: {
    //      y: 5
    //    },
    //    stops: [
    //      [0.1, '#D32F2F'], // red
    //      [0.5, '#C6FF00'], // yellow
    //      [0.9, '#4CAF50'] // green
    //    ],
    //    lineWidth: 0,
    //    tickInterval: 10,
    //    tickPixelInterval: 400,
    //    tickWidth: 0,
    //    labels: {
    //      y: 0.2
    //    }
    //  },
    //  loading: false
    //};
    //
    //$scope.chartConfig2 = {
    //  options: {
    //    chart: {
    //      type: 'solidgauge'
    //    },
    //    pane: {
    //      center: ['50%', '88%'],
    //      size: '150%',
    //      startAngle: -90,
    //      endAngle: 90,
    //      background: {
    //        backgroundColor:'#EEE',
    //        innerRadius: '60%',
    //        outerRadius: '100%',
    //        shape: 'arc'
    //      }
    //    },
    //    solidgauge: {
    //      dataLabels: {
    //        y: -10,
    //        borderWidth: 0,
    //        useHTML: false
    //      }
    //    }
    //  },
    //  series: [{
    //    data: [60]
    //  }],
    //  title: {
    //    text: 'อัตราตายจากอุบัติเหตุทางถนน',
    //    y: 50
    //  },
    //  yAxis: {
    //    currentMin: 0,
    //    currentMax: 100,
    //    title: {
    //      y: 5
    //    },
    //    stops: [
    //      [0.1, '#D32F2F'], // red
    //      [0.5, '#C6FF00'], // yellow
    //      [0.9, '#4CAF50'] // green
    //    ],
    //    lineWidth: 0,
    //    tickInterval: 10,
    //    tickPixelInterval: 400,
    //    tickWidth: 0,
    //    labels: {
    //      y: 0.2
    //    }
    //  },
    //  loading: false
    //};
    //
    //$scope.chartConfig3 = {
    //
    //  title: {
    //    text: 'Combination chart'
    //  },
    //  xAxis: {
    //    categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
    //  },
    //  labels: {
    //    items: [{
    //      html: 'Total fruit consumption',
    //      style: {
    //        left: '50px',
    //        top: '18px',
    //        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
    //      }
    //    }]
    //  },
    //  series: [{
    //    type: 'column',
    //    name: 'Jane',
    //    data: [3, 2, 1, 3, 4]
    //  }, {
    //    type: 'column',
    //    name: 'John',
    //    data: [2, 3, 5, 7, 6]
    //  }, {
    //    type: 'column',
    //    name: 'Joe',
    //    data: [4, 3, 3, 9, 0]
    //  }, {
    //    type: 'spline',
    //    name: 'Average',
    //    data: [3, 2.67, 3, 6.33, 3.33],
    //    marker: {
    //      lineWidth: 2,
    //      lineColor: Highcharts.getOptions().colors[3],
    //      fillColor: 'white'
    //    }
    //  }]
    //
    //};
});
