var express = require('express');
var router = express.Router();

var Categories = require('../models/Categories');
var ItemType = require('../models/ItemType');
var Years = require('../models/Years');
var Provinces = require('../models/Provinces');
var Kpis = require('../models/Kpis');
var Users = require('../models/Users');

router.get('/base', function (req, res) {
  var baseData = {};

  Categories.getList(req.db)
    .then(function (rows) {
      baseData.categories = rows;
      return ItemType.getList(req.db);
    })
    //.then(function (rows) {
    //  baseData.itemType = rows;
    //})
    //.then(function (rows) {
    //  baseData.years = rows;
    //  return Provinces.getList(req.db);
    //})
    .then(function (rows) {
      baseData.itemType = rows;
      res.send({ ok: true, data: baseData });
    }, function (err) {
      res.send({ ok: false, msg: err });
    })
});

router.get('/categories', function(req, res, next) {

  Categories.getList(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.get('/usertype', function(req, res, next) {

  Users.getUserType(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.get('/types', function(req, res, next) {

  ItemType.getList(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.get('/years', function(req, res, next) {

  Years.getList(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.get('/provinces', function(req, res, next) {

  Provinces.getList(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.post('/kpis', function(req, res, next) {

  var category_id = req.body.c;
  var type = req.body.t;

  Kpis.getList(req.db, category_id, type)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.get('/kpis/detail/:id', function(req, res) {

  var kpi_id = req.params.id;

  Kpis.getDetail(req.db, kpi_id)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.post('/result/province', function (req, res) {
  var kpi_id = req.body.kpi_id;

  if (!kpi_id) {
    res.send({ok: false, msg: "กรุณาระบุตัวชี้วัด"});
  } else {
    Kpis.getResultProvince(req.db, kpi_id)
      .then(function (rows) {
        res.send({ok: true, rows: rows[0]});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }
});

router.get('/kpis/sample', function (req, res) {
  Kpis.getSample(req.db)
    .then(function (rows) {
      res.send({ok: true, rows: rows});
    }, function (err) {
      res.send({ok: false, msg: err});
    });
});

router.post('/kpis/sample', function (req, res) {
  var _ = require('lodash');

  var kpis = req.body.kpis;
  var charts = [];

  if (kpis.length == 3) {
    Kpis.getResultProvince(req.db, kpis[0].number_id)
      .then(function (rows) {
        charts.push({data: rows[0], id: kpis[0].number_id, name: kpis[0].item_name, pass_score: kpis[0].pass_score});
        return Kpis.getResultProvince(req.db, kpis[1].number_id);
      })
      .then(function (rows) {
        charts.push({data: rows[0], id: kpis[1].number_id, name: kpis[1].item_name, pass_score: kpis[1].pass_score});
        return Kpis.getResultProvince(req.db, kpis[2].number_id);
      })
      .then(function (rows) {
        charts.push({data: rows[0], id: kpis[2].number_id, name: kpis[2].item_name, pass_score: kpis[2].pass_score});
        res.send({ok: true, charts: charts});
      }, function (err) {
        res.send({ok: false, msg: err});
      })
  } else {
    res.send({ok: false, msg: 'จำนวนตัวอย่างไม่ครบ'});
  }

});

module.exports = router;
