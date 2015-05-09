var express = require('express');
var oracledb = require('oracledb');
var router = express.Router();
var last = [];
var name_seasrch;
var names;

router.get('/', function(req, res, next) {

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

				" SELECT A.USER_ID ,A.EMAIL, A.FIRST_NAME, A.LAST_NAME"
				+ " FROM APP_USER A"
				+ " WHERE A.USER_ID != :user_id and A.USER_ID not in"
				+ "(select R.USER_B_ID from RELATION R where R.USER_A_ID = :USER_A_ID AND R.STATUS = 3)",[userProfile.id, userProfile.id],
				function(err, result)
				{
					if (err) { console.error(err); return; }
					last = result.rows;
					console.log("test");
					console.log(last);
				    res.render('addfriends', { allcandidates: last, userGivenName: userProfile.name.givenName});
					// connection.execute(
// 						"select USER_B_ID from RELATION where USER_A_ID = :USER_A_ID AND STATUS = 3 ",[userProfile.id],
// 						function(err, result)
// 						{
// 							if (err) { console.error(err); return; }
// 							console.log(result.rows);
// 						    res.render('addfriends', { allcandidates: last, userGivenName: userProfile.name.givenName});
// 						});
					});
	});
});

module.exports = router;
