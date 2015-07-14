// KPI items
var Q = require('q');

exports.getList = function (db) {

  var q = Q.defer();

  db('categories')
    .select()
    .orderBy('category_name')
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.save = function (db, name) {
  var q = Q.defer();

  db('categories')
    .insert({ category_name: name })
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.update = function (db, id, name) {
  var q = Q.defer();

  db('categories')
    .update({ category_name: name })
    .where('id', id)
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.remove = function (db, id) {
  var q = Q.defer();

  db('categories')
    .where('id', id)
    .del()
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};