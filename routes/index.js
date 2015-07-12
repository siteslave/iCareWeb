var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KPI Cockpit' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please login' });
});

router.get('/denied', function (req, res) {
  res.send({ok: false, msg: 'Access denied.'});
});

module.exports = router;
