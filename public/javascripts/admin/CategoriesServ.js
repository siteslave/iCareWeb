// Main service

angular.module('app.admin.CategoriesServ', [])
  .factory('CategoriesServ', function ($q, $http) {

    return {

      list: function () {
        var q = $q.defer();

        $http.get('/admin/categories')
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

      save: function (name) {
        var q = $q.defer();

        $http.post('/admin/categories', {name: name})
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

      update: function (id, name) {
        var q = $q.defer();

        $http.put('/admin/categories', {id: id, name: name})
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

        $http.delete('/admin/categories/' + id)
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
