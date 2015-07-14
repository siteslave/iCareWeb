var express = require('express');
var router = express.Router();
var Kpis = require('../models/Kpis');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('users', {
    title: 'ระบบบันทึกข้อมูลตัวชี้วัด',
    fullname: req.session.fullname,
    prov_code: req.session.province,
    prov_name: req.session.prov_name
  });
});

// Get kpi list
router.get('/kpis', function(req, res, next) {
  var province = req.session.province;
  Kpis.getUserKpiList(req.db, req.session.province)
    .then(function (rows) {
      res.send({ ok: true, rows: rows[0] });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

// Update data
router.put('/kpis', function(req, res) {

  var province = req.session.province;
  var data = req.body.data;

  var year = data.year;
  var month = data.month;
  var result = data.result;
  var target = data.target;
  var kpi_id = data.kpi_id;

  // Check duplicate result
  Kpis.chkKpiUserDuplicatedResult(req.db, kpi_id, month, year, province)
    .then(function (total) {
      if (total > 0) {
        return Kpis.updateUserKpiResult(req.db, province, kpi_id, result, month, year);
      } else {
        return Kpis.saveUserKpiResult(req.db, province, kpi_id, result, month, year);
      }
    })
    .then(function () {
      Kpis.chkKpiUserDuplicatedTarget(req.db, kpi_id, year, province)
        .then(function (total) {
          if (total > 0) {
            return Kpis.updateUserKpiTarget(req.db, province, kpi_id, target, year);
          } else {
            return Kpis.saveUserKpiTarget(req.db, province, kpi_id, target, year)
          }
        })
        .then(function () {
          res.send({ok: true});
        });
    }, function (err) {
      res.send({ok: false, msg: err});
    });

});

router.get('/partials/main', function (req, res) {
  res.render('partials/users/Main');
});

module.exports = router;
