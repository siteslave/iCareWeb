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
      }
    }

  });