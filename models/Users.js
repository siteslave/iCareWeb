// KPI items
var Q = require('q');

exports.getList = function (db) {

  var q = Q.defer();

  db('users as u')
    .select('u.*', 'p.prov_name', 't.user_type_name')
    .leftJoin('provinces as p', 'p.prov_code', 'u.province')
    .leftJoin('user_type as t', 't.id', 'u.user_type')
    .orderBy('u.fullname')
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.getUserType = function (db) {

  var q = Q.defer();

  db('user_type')
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.save = function (db, user) {
  var q = Q.defer();

  db('users')
    .insert({
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      is_active: user.is_active,
      user_type: user.user_type,
      province: user.province
    })
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.update = function (db, user) {
  var q = Q.defer();

  db('users')
    .update({
      fullname: user.fullname,
      is_active: user.is_active,
      user_type: user.user_type,
      province: user.province
    })
    .where('username', user.username)
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.changePassword = function (db, username, password) {
  var q = Q.defer();

  db('users')
    .update({
      password: password
    })
    .where('username', username)
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.remove = function (db, username) {
  var q = Q.defer();

  db('users')
    .where('username', username)
    .del()
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.auth = function (db, username, password) {
  var q = Q.defer();

  db('users as u')
    .select('u.*', 'p.prov_name')
    .leftJoin('provinces as p', 'p.prov_code', 'u.province')
    .where('username', username)
    .where('password', password)
    .where('is_active', 'Y')
    .limit(1)
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};