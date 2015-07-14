// Province
var Q = require('q');

exports.getList = function (db) {

  var q = Q.defer();

  db('provinces')
    .select()
    .where('prov_area', '7')
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};