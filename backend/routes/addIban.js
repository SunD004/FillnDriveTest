var express = require('express');
var router = express.Router();
var db = require('../database.js')

router.post('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("ici=", req.body.iban)

  var insert = 'INSERT INTO ibans (iban) VALUES (?)'
  db.run(insert, [req.body.iban])
  // var sql = "select * from ibans"
  // var params = []
  // db.all(sql, params, (err, rows) => {
  //   if (err) {
  //     res.status(400).json({ "error": err.message });
  //     return;
  //   }
  //   console.log(rows)
  //   res.json({
  //     "message": "success",
  //     "data": rows
  //   })
  // });
  res.sendStatus(200)
});

module.exports = router;
