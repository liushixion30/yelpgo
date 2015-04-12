var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
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
				"INSERT INTO app_user VALUES (:USER_ID, :USER_PASSWORD, :FIRST_NAME, :LAST_NAME, :EMAIL)",[req.body.username,req.body.password,req.body.firstname,req.body.password,req.body.email],
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
				res.render('register-success', { title: 'success' });
			});

			module.exports = router;