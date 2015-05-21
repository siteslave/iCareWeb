// Main application module
var app = angular.module('app', ['lumx', 'ngRoute', 'highcharts-ng']);

app.config(function ($routeProvider) {
	//Main routes
	$routeProvider
        .when('/', {
            template: '/main',
            controller: 'MainController'
        })
        .otherwise({ redirectTo: '/' });

});

app.controller('MainController', function ($scope) {
    $scope.chartConfig = {

        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },
        size: {
           height: 250
       },

        loading: false

      };

    $scope.chartConfig2 = {

        options: {
            chart: {
                type: 'line'
            },
            tooltip: {
                style: {
                    padding: 10,
                    fontWeight: 'bold'
                }
            },
        },
        size: {
           height: 250
       },
          series: [{
             data: [10, 15, 12, 8, 7]
          }],
          //Title configuration (optional)
          title: {
             text: 'Hello'
          },
          loading: false,
          xAxis: {
              currentMin: 0,
              currentMax: 20,
              title: {text: 'values'}
          }
      };
});
