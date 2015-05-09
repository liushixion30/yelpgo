var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

router.post('/', function(req, res, next) {
	var friendid=req.body.friendid;
	console.log(friendid);
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
				" UPDATE RELATION "
			  + " SET STATUS = 3 "
			  + " WHERE USER_A_ID = :user_aid AND USER_B_ID = :user_bid ",[userProfile.id,friendid],
				{isAutoCommit: true},
				function(err, result)
				{
					if (err) { 
						console.error(err); 
						return; 
					}
					console.log("update success!");
					connection.execute(
						" UPDATE RELATION "
					  + " SET STATUS = 3 "
					  + " WHERE USER_A_ID = :user_aid AND USER_B_ID = :user_bid ",[friendid,userProfile.id],
						{isAutoCommit: true},
						function(err, result)
						{
							if (err) { 
								console.error(err); 
								return; 
							}
							console.log("update success!");
							
						});
				});
		}
    );
	res.end("yes");
});

module.exports = router;
