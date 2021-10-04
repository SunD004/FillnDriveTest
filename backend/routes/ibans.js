var express = require('express');
var router = express.Router();
var db = require('../database.js')

router.get('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  var sql = "select * from ibans"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json({
      "message": "success",
      "data": rows,
    })
  });
});

module.exports = router;
