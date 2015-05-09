var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
var all_friends='';
var all_friends_copy = '';
var review_list=[];

router.get('/', function(req, res, next) {	
	if(userProfile.id == undefined){
		res.render('login', { title: 'Login' });
	}else{
	oracledb.getConnection(
		{
			user          : "myusername",
			password      : "mypassword",
			connectString : "mydbinstance.cojoy7d62wsg.us-east-1.rds.amazonaws.com/MYDB"
		},
		function(err, connection)
		{
			if (review_list.length != 0){
				review_list = [];
			}
			if (err) { console.error(err); return; }
			connection.execute(
				"select B.BUSINESS_NAME, A.FIRST_NAME, A.LAST_NAME, U.USER_ID, U.BUSINESS_ID, U.SELF_REVIEW, U.ADD_TIME "+ 
				"from USER_REVIEW U, APP_USER A, BUSINESS B "+ 
				"where A.USER_ID = U.USER_ID AND B.BUSINESS_ID = U.BUSINESS_ID AND U.USER_ID in "+
				"(select USER_B_ID from RELATION where USER_A_ID  = :USER_A_ID and STATUS = :STATUS) order by U.ADD_TIME, U.USER_ID ",[userProfile.id,3],
				function(err, result1)
				{
					if (err) { console.error(err); return; }
					console.log(result1.rows);
					review_list = result1.rows;
		 			review_list.sort(function(a,b) { return parseFloat(a[6]) - parseFloat(b[6]) } );
		 			res.render('friendsupdates', { reviewlist: review_list, userGivenName: userProfile.name.givenName});		
				});
			});
 			
		}
		});

		module.exports = router;
