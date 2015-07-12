// Item type
var Q = require('q');

exports.getList = function (db) {

  var q = Q.defer();

  db('item_type')
    .select()
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};