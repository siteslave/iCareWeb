// Main service

angular.module('app.main.MainServ', [])
  .factory('MainServ', function ($q, $http) {

    return {

      getBase: function () {
        var q = $q.defer();

        $http.get('/api/base')
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.data);
            } else {
              q.reject(data.msg);
            }
          })
          .error(function (data, status) {
            q.reject(status);
          });

        return q.promise;
      },

      getSample: function () {
        var q = $q.defer();

        $http.get('/api/kpis/sample')
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.rows);
            } else {
              q.reject(data.msg);
            }
          })
          .error(function (data, status) {
            q.reject(status);
          });

        return q.promise;
      },

      getChartSample: function (kpis) {
        var q = $q.defer();

        $http.post('/api/kpis/sample', {kpis: kpis})
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.charts);
            } else {
              q.reject(data.msg);
            }
          })
          .error(function (data, status) {
            q.reject(status);
          });

        return q.promise;
      },

      getKpi: function (category, type) {
        var q = $q.defer();

        $http.post('/api/kpis', {c: category, t: type})
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.rows);
            } else {
              q.reject(data.msg);
            }
          })
          .error(function (data, status) {
            q.reject(status);
          });

        return q.promise;
      },

      getDetail: function (kpi_id) {
        var q = $q.defer();
        var url = '/api/kpis/detail/' + kpi_id;

        $http.get(url)
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.rows);
            } else {
              q.reject(data.msg);
            }
          })
          .error(function (data, status) {
            q.reject(status);
          });

        return q.promise;
      },

      getResultProvince: function (kpi_id) {
        var q = $q.defer();

        $http.post('/api/result/province', {kpi_id: kpi_id})
          .success(function (data) {
            if (data.ok) {
              q.resolve(data.rows);
            } else {
              q.reject(data.msg);
            }
          })
          .error(function (data, status) {
            q.reject(status);
          });

        return q.promise;
      }
    }

  });