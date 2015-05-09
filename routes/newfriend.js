var express = require('express');
var oracledb = require('oracledb');
var router = express.Router();


router.post('/', function(req, res, next) {
	var friend_id = req.body.friendid
	console.log("Friend_id is "+friend_id);
	
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
				"INSERT INTO RELATION VALUES (:USER_A_ID, :USER_B_ID, :STATUS)",[userProfile.id,friend_id,2],
				{isAutoCommit: true},
				function(err, result)
				{
					if (err) { 
						console.error(err); 
						return; 
					}
					connection.execute(
						"INSERT INTO RELATION VALUES (:USER_A_ID, :USER_B_ID, :STATUS)",[friend_id,userProfile.id,2],
						{isAutoCommit: true},
						function(err, result)
						{
							if (err) {  console.error(err); return; }
							console.log("update success!");
						});
					console.log("insert success!");
				});
		}
    );
	res.end("yes");
});

module.exports = router;