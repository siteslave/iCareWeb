
// KPI
var Q = require('q');
var moment = require('moment');

exports.getList = function (db, category, type) {

  /*
  Type:
    1 = Moph
    2 = Area
    3 = Province
   */
  var q = Q.defer();
  var opt = '';

  if (type == 1) opt = 'and i.moph="Y" ';
  if (type == 2) opt = 'and i.region="Y" ';
  if (type == 3) opt = 'and i.province="Y" ';

  var optCategory = '';

  if (category) {
    optCategory = ' and i.category_id=' + category + ' group by i.number_id';
  } else {
    optCategory = ' group by i.number_id';
  }

  var sql = 'select i.number_id, i.item_name, i.pass_score, i.item_type, ' +
    '(select ifnull(sum(t.total), 0) from targets as t where t.kpi_id=i.number_id) as target, ' +
    '(select ifnull(sum(r.total), 0) from results as r where r.kpi_id=i.number_id) as result ' +
    'from items as i where i.item_status="Y" ' + opt + optCategory;
console.log(sql);

  db.raw(sql)
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

exports.getUserKpiList = function (db, province) {

  var q = Q.defer();


  var sql = 'select i.number_id, i.item_name, i.pass_score, i.item_type, ' +
    '(select ifnull(sum(t.total), 0) from targets as t where t.kpi_id=i.number_id and t.province=?) as target, ' +
    '(select ifnull(sum(r.total), 0) from results as r where r.kpi_id=i.number_id and r.province=?) as result ' +
    'from items as i where i.item_type=? and i.item_status="Y" group by i.number_id order by i.number_id';

  db.raw(sql, [province, province, '2'])
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.getResultProvince = function (db, kpi_id) {

  var q = Q.defer();

  var sql = 'select p.prov_code, p.prov_name, ' +
    '(select sum(t.total) from targets as t where t.kpi_id=? and t.province=p.prov_code) as target, ' +
    '(select sum(r.total) from results as r where r.kpi_id=? and r.province=p.prov_code) as result ' +
    'from provinces as p where p.prov_area="7" group by p.prov_code';

  db.raw(sql, [kpi_id, kpi_id])
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.getDetail = function (db, id) {

  var q = Q.defer();

  db('items as i')
    .select('i.*', 'c.category_name')
    .leftJoin('categories as c', 'c.id', 'i.category_id')
    .where('i.number_id', id)
    .limit(1)
    .then(function (rows) {
      q.resolve(rows[0]);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.getSample = function (db) {

  var q = Q.defer();

  db('items')
    .select('number_id', 'item_name', 'pass_score')
    .where({
      item_status: 'Y',
      chart_front: 'Y'
    })
    .then(function (rows) {
      q.resolve(rows);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.update = function (db, data) {
  var q = Q.defer();

  db('items')
    .update({
      item_name: data.item_name,
      item_status: data.item_status,
      moph: data.moph,
      region: data.region,
      province: data.province,
      category_id: data.category_id,
      item_type: data.item_type,
      pass_score: data.pass_score,
      chart_front: data.chart_front
    })
    .where('number_id', data.number_id)
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.save = function (db, data) {
  var q = Q.defer();

  db('items')
    .insert({
      number_id: data.number_id,
      item_name: data.item_name,
      item_status: data.item_status,
      moph: data.moph,
      region: data.region,
      province: data.province,
      category_id: data.category_id,
      item_type: data.item_type,
      pass_score: data.pass_score,
      chart_front: data.chart_front
    })
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.isDuplicated = function (db, number_id) {
  var q = Q.defer();

  db('items')
    .count('* as total')
    .where('number_id', number_id)
    .then(function (rows) {
      q.resolve(rows[0].total);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.remove = function (db, id) {
  var q = Q.defer();

  db('items')
    .where('number_id', id)
    .del()
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.saveUserKpiResult = function (db, province, kpi_id, total, month, year) {
  var q = Q.defer();

  db('results')
    .insert({
      kpi_id: kpi_id,
      province: province,
      hospcode: '00000',
      total: total,
      s_year: year,
      s_month: month,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.updateUserKpiResult = function (db, province, kpi_id, total, month, year) {
  var q = Q.defer();

  db('results')
    .where({
      kpi_id: kpi_id,
      province: province,
      s_year: year,
      s_month: month,
      hospcode: '00000'
    })
    .update({
      total: total,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.chkKpiUserDuplicatedResult = function (db, kpi_id, month, year, province) {

  var q = Q.defer();

  db('results')
    .count('* as total')
    .where({
      kpi_id: kpi_id,
      s_month: month,
      s_year: year,
      province: province,
      hospcode: '00000'
    })
    .then(function (rows) {
      q.resolve(rows[0].total);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.chkKpiUserDuplicatedTarget = function (db, kpi_id, year, province) {

  var q = Q.defer();

  db('targets')
    .count('* as total')
    .where({
      kpi_id: kpi_id,
      kpi_year: year,
      province: province,
      hospcode: '00000'
    })
    .then(function (rows) {
      q.resolve(rows[0].total);
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;
};

exports.saveUserKpiTarget = function (db, province, kpi_id, total, year) {
  var q = Q.defer();
  var moment = require('moment');

  db('targets')
    .insert({
      kpi_id: kpi_id,
      province: province,
      hospcode: '00000',
      total: total,
      kpi_year: year,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};

exports.updateUserKpiTarget = function (db, province, kpi_id, total, year) {
  var q = Q.defer();
  var moment = require('moment');

  db('targets')
    .where({
      kpi_id: kpi_id,
      province: province,
      hospcode: '00000',
      kpi_year: year
    })
    .update({
      total: total,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .then(function () {
      q.resolve();
    })
    .catch(function (err) {
      q.reject(err);
    });

  return q.promise;

};
