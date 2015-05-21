var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
  res.render('partials/Main');
});
router.get('/upload', function (req, res) {
    res.render('partials/Upload');
});

module.exports = router;