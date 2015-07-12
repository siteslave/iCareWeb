// KPI items
var Q = require('q');

exports.getListByCategory = function (db, category) {

  var q = Q.defer();

  db('items')
    .select()
    .where({
      item_status: 'Y',
      category_id: category
    })
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};