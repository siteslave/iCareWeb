// Main service

angular.module('app.users.MainServ', [])
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

      getKpi: function () {
        var q = $q.defer();

        $http.get('/users/kpis')
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

      update: function (items) {
        var q = $q.defer();

        $http.put('/users/kpis', {data: items})
          .success(function (data) {
            if (data.ok) {
              q.resolve();
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
