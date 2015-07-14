var express = require('express');
var router = express.Router();

// Models
var Kpis = require('../models/Kpis');
var Categories = require('../models/Categories');
var Users = require('../models/Users');

// Main page
router.get('/', function(req, res, next) {
  res.render('admin', {title: 'Admin', fullname: req.session.fullname});
});

// Get kpi list
router.get('/kpis', function(req, res, next) {
  Kpis.getListEdit(req.db)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

// Get kpi detail
router.post('/kpis/detail', function(req, res, next) {

  var id = req.body.id;

  Kpis.getDetail(req.db, id)
    .then(function (rows) {
      res.send({ ok: true, rows: rows });
    }, function (err) {
      res.send({ ok: false, msg: err });
    });

});

router.post('/kpis', function (req, res) {

  var data = req.body.data;
  var items = {};

  items.item_name = data.item_name;
  items.item_status = data.item_status;
  items.moph = data.moph;
  items.region = data.region;
  items.province = data.province;
  items.category_id = data.category_id;
  items.item_type = data.item_type;
  items.pass_score = data.pass_score;
  items.chart_front = data.chart_front;
  items.number_id = data.number_id;

  if (!data.item_name) {
    res.send({ok: false, msg: 'กรุณาระบุชื่อตัวชี้วัด'});
  } else if (!data.number_id) {
    res.send({ok: false, msg: 'กรุณาระบุรหัสตัวชี้วัด'});
  } else if (!data.pass_score) {
    res.send({ok: false, msg: 'กรุณาระบุคะแนนผ่านเกณฑ์มาตรฐาน'});
  } else {
    console.log(items);

    Kpis.isDuplicated(req.db, items.number_id)
      .then(function (total) {
        if (total > 0) {
          console.log('duplicated');
          res.send({ok: false, msg: 'รหัสตัวชี้วัดนี้มีอยู่แล้ว กรุณาใช้รหัสอื่น'});
        } else {
          Kpis.save(req.db, items)
            .then(function () {
              res.send({ok: true});
            }, function (err) {
              res.send({ok: false, msg: err});
            });
        }
      }, function (err) {
        res.send({ok: false});
        console.log(err);
      });

  }

});

router.put('/kpis', function (req, res) {

  var data = req.body.data;
  var items = {};

  items.item_name = data.item_name;
  items.item_status = data.item_status;
  items.moph = data.moph;
  items.region = data.region;
  items.province = data.province;
  items.category_id = data.category_id;
  items.item_type = data.item_type;
  items.pass_score = data.pass_score;
  items.chart_front = data.chart_front;
  items.number_id = data.number_id;

  if (!data.item_name) {
    res.send({ok: false, msg: 'กรุณาระบุชื่อตัวชี้วัด'});
  } else if (!data.number_id) {
    res.send({ok: false, msg: 'กรุณาระบุรหัสตัวชี้วัด'});
  } else if (!data.pass_score) {
    res.send({ok: false, msg: 'กรุณาระบุคะแนนผ่านเกณฑ์มาตรฐาน'});
  } else {

    Kpis.update(req.db, items)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });

  }

});

router.delete('/kpis/:id', function (req, res) {
  var id = req.params.id;
  if (!id) {
    res.send({ok: false, msg: 'ไม่พบรหัสตัวชี้วัดที่ต้องการลบ'});
  } else {
    Kpis.remove(req.db, id)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }
});

router.get('/categories', function (req, res) {

  Categories.getList(req.db)
    .then(function (rows) {
      res.send({ok: true, rows: rows});
    }, function (err) {
      res.send({ok: false, msg: err});
    });

});

router.post('/categories', function (req, res) {

  var name = req.body.name;

  if (!name) {
    res.send({ok: false, msg: 'กรุณาระบุชื่อของหมวดหมู่'});
  } else {
    Categories.save(req.db, name)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }

});

router.put('/categories', function (req, res) {

  var name = req.body.name;
  var id = req.body.id;

  if (!name || !id) {
    res.send({ok: false, msg: 'กรุณาระบุชื่อ/รหัส ของหมวดหมู่'});
  } else {
    Categories.update(req.db, id, name)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }

});

router.delete('/categories/:id', function (req, res) {
  var id = req.params.id;

  if (!id) {
    res.send({ok: false, msg: 'ไม่พบรหัสที่ต้องการลบ'});
  } else {
    Categories.remove(req.db, id)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }
});

router.get('/users', function (req, res) {

  Users.getList(req.db)
    .then(function (rows) {
      res.send({ok: true, rows: rows});
    }, function (err) {
      res.send({ok: false, msg: err});
    });

});

router.post('/users', function (req, res) {

  var user = req.body.user;

  if (!user.username || !user.fullname || !user.password || !user.user_type || !user.province) {
    res.send({ok: false, msg: 'ข้อมูลไม่สมบูรณ์ กรุณาตรวจสอบ'});
  } else {

    var crypto = require('crypto');
    user.password = crypto.createHash('md5').update(user.password).digest('hex');

    Users.save(req.db, user)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }

});

router.put('/users', function (req, res) {

  var user = req.body.user;

  if (!user.username || !user.fullname || !user.user_type || !user.province) {
    res.send({ok: false, msg: 'กรุณาระบุข้อมูลให้ครบถ้วน'});
  } else {
    Users.update(req.db, user)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }

});

router.put('/users/changepass', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    res.send({ok: false, msg: 'กรุณาระบุข้อมูลให้ครบถ้วน'});
  } else {
    var crypto = require('crypto');
    var cryptPassword = crypto.createHash('md5').update(password).digest('hex');

    Users.changePassword(req.db, username, cryptPassword)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }

});

router.delete('/users/:username', function (req, res) {
  var username = req.params.username;

  if (!username) {
    res.send({ok: false, msg: 'ไม่พบรหัสที่ต้องการลบ'});
  } else {
    Users.remove(req.db, username)
      .then(function () {
        res.send({ok: true});
      }, function (err) {
        res.send({ok: false, msg: err});
      });
  }
});

// partials
router.get('/partials/main', function (req, res) {
  res.render('./partials/admin/Main');
});
router.get('/partials/categories', function (req, res) {
  res.render('./partials/admin/Categories');
});
router.get('/partials/users', function (req, res) {
  res.render('./partials/admin/Users');
});

module.exports = router;
