// Year
var Q = require('q');

exports.getList = function (db) {

  var q = Q.defer();

  db('years')
    .select()
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};