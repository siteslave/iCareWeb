var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', {title: 'Admin'});
});

router.get('/partials/main', function (req, res) {
  res.render('./partials/admin/Main');
});

module.exports = router;
