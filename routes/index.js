var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KPI Cockpit' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please login' });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(function () {
    res.redirect('/');
  });
});


router.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.render('login', {title: 'กรุณาระบุชื่อผู้ใช้งาน/รหัสผ่าน'});
  } else {
    var crypto = require('crypto');
    var encryptPassword = crypto.createHash('md5').update(password).digest('hex');

    console.log(req.body);
    console.log(encryptPassword);

    Users.auth(req.db, username, encryptPassword)
      .then(function (user) {
        console.log(user);
        if (user.length) {
          if (user[0].user_type == 1) {
            req.session.isAdmin = true;
            req.session.fullname = user[0].fullname;
            res.redirect('/admin');
          } else {
            req.session.province = user[0].province;
            req.session.prov_name = user[0].prov_name;
            req.session.username = username;
            req.session.fullname = user[0].fullname;
            res.redirect('/users');
          }
        } else {
          res.render('login', {title: 'ชื่อผู้ใช้งานหรือรหัสผ่าน ไม่ถูกต้อง'});
        }
      })
  }
});

router.get('/denied', function (req, res) {
  res.send({ok: false, msg: 'Access denied.'});
});

module.exports = router;
