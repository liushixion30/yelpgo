var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
/* GET home page. */
router.all('/', function(req, res, next) {
	var review = req.body.review;
	var userId = req.body.userid;
	var resId = req.body.resId;
	resId = resId.substring(0, resId.length - 1);
	var addSecond = new Date().getTime() / 1000;
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
				"INSERT INTO USER_REVIEW VALUES (:USER_ID, :BUSINESS_ID, :SELF_REVIEEW, :ADD_TIME)",[userId,resId,review,addSecond],
				{ isAutoCommit: true},
				function(err,result)
				{
					if (err) { console.error(err); return; }
					console.log("Rows inserted: " + result.rowsAffected);
					connection.release(
						function(err)
						{
							if (err) { console.error(err.message); return; }
							
						});
					});
				});
				res.end("yes");
			});
			module.exports = router;