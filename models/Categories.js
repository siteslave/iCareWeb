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