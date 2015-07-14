var express = require('express');
var router = express.Router();

var Categories = require('../models/Categories');

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('partials/Main');
});

router.get('/result/province', function (req, res) {
  res.render('partials/ResultProvince');
});

module.exports = router;