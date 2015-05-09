var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
/* GET home page. */
router.post('/', function(req, res, next) {
	var activity_id = req.body.activityId;
	var user_id = req.body.userid;
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
				"INSERT INTO ACTIVITY_PEOPLE VALUES (:ACTIVITY_ID, :USER_ID)",[activity_id,user_id],
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