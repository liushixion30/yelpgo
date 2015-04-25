var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

/* GET home page. */
router.post('/', function(req, res, next) {
	var time = req.body.time;
	var userId = req.body.userid;
	var actId = req.body.actId;
	actId = actId.substring(0, actId.length - 1);
	var comment = req.body.comment;
	var addSecond = new Date().getTime() / 1000;
	console.log("time is = "+time + ", user id is = " + userId+", restaurant id = " + actId + ", comment is = " + comment+", addTime is＝ "+addSecond);
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
				"INSERT INTO USER_ACTIVITY VALUES (:USER_ID, :BUSINESS_ID, :ACTIVITY_TIME, :ACTIVITY_COMMENT, :ADD_TIME)",[userId,actId,time,comment,addSecond],
				{ isAutoCommit: true},
				function(err,result)
				{
					console.log("test2");
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