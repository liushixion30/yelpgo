var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();


oracledb.getConnection(
  {
    user          : "myusername",
    password      : "mypassword",
    connectString : "mydbinstance.cojoy7d62wsg.us-east-1.rds.amazonaws.com/MYDB"
  },
  function(err, connection)
  {
    if (err) { console.error(err); return; }
    connection.execute(
      "select * from BUSINESS where ROWNUM  = 1",
      function(err, result)
      {
        if (err) { console.error(err); return; }
		console.log("test");
        console.log(result);
		console.log(userProfile.id);
      });
  });
  router.get('/', function(req, res, next) {
    res.send('respond with a sql');
  });

module.exports = router;