
// KPI
var Q = require('q');

exports.getList = function (db, category, type) {

  /*
  Type:
    1 = Moph
    2 = Area
    3 = Province
   */
  var q = Q.defer();
  var opt = null;

  if (type == 1) opt = 'and i.moph="Y" group by i.number_id';
  if (type == 2) opt = 'and i.region="Y" group by i.number_id';
  if (type == 3) opt = 'and i.province="Y" group by i.number_id';
  else opt = ' group by i.number_id';

  var sql = 'select i.number_id, i.item_name, i.pass_score, i.item_type, ' +
    '(select ifnull(sum(t.total), 0) from targets as t where t.kpi_id=i.number_id) as target, ' +
    '(select ifnull(sum(r.total), 0) from results as r where r.kpi_id=i.number_id) as result ' +
    'from items as i where i.category_id=? ' + opt;

  db.raw(sql, [category])
    .then(function (rows) {
      q.resolve(rows[0]);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.getListEdit = function (db) {

  var q = Q.defer();

  db('items')
    .select('*')
    .orderBy('number_id')
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};