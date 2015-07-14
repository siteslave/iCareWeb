
angular.module('app.admin.UserServ', [])
  .factory('UserServ', function ($q, $http) {

    return {

      getProvince: function () {
        var q = $q.defer();

        $http.get('/api/provinces')
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

      getUserType: function () {
        var q = $q.defer();

        $http.get('/api/usertype')
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

      list: function () {
        var q = $q.defer();

        $http.get('/admin/users')
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

      save: function (user) {
        var q = $q.defer();

        $http.post('/admin/users', {user: user})
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

      update: function (user) {
        var q = $q.defer();

        $http.put('/admin/users', {user: user})
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

      changePassword: function (username, password) {
        var q = $q.defer();

        $http.put('/admin/users/changepass', {username: username, password: password})
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

      remove: function (username) {
        var q = $q.defer();

        $http.delete('/admin/users/' + username)
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
