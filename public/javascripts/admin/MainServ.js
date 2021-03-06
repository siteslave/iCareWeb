// Main service

angular.module('app.admin.MainServ', [])
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

        $http.get('/admin/kpis')
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

      getKpiDetail: function (id) {
        var q = $q.defer();

        $http.post('/admin/kpis/detail', {id: id})
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

      save: function (data) {
        var q = $q.defer();

        $http.post('/admin/kpis', {data: data})
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
      },

      update: function (data) {
        var q = $q.defer();

        $http.put('/admin/kpis', {data: data})
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
      },

      remove: function (id) {
        var q = $q.defer();

        $http.delete('/admin/kpis/' + id)
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
