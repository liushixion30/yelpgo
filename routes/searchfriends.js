var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
var last;
var name_seasrch;
var names;
router.all('/', function(req, res, next) {
	name_search=req.body.names;
	names = name_search.split(" ");
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

				" SELECT USER_ID ,EMAIL"
				+ " FROM APP_USER "
				+ " WHERE FIRST_NAME = :first_name AND LAST_NAME = :last_name",[names[0],names[1]],
				function(err, result)
				{
					if (err) { console.error(err); return; }
					last = result;
					console.log("test");
					console.log(last);
					connection.execute(
						"select USER_B_ID from RELATION where USER_A_ID = :USER_A_ID",[last.rows[0][0]],
						function(err, result)
						{
							if (err) { console.error(err); return; }
							console.log(result.rows);
							res.render('searchfriends', { allcandidates: last, last_name: names[1], first_name: names[0]});
						});
					});
	});
});
module.exports = router;