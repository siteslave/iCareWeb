var express = require('express');
var router = express.Router();

var Categories = require('../models/Categories');
var ItemType = require('../models/ItemType');
var Years = require('../models/Years');
var Provinces = require('../models/Provinces');
var Kpis = require('../models/Kpis');

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

router.post('/kpis/list', function(req, res, next) {

  var category_id = req.body.c;

  Kpis.getListEdit(req.db, category_id)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});



module.exports = router;