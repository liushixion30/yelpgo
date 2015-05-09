var express = require('express');
var oracledb = require('oracledb');var express = require('express');
var oracledb = require('oracledb');
var router = express.Router();
var friendrequest = [];
var personalreview = [];
var personalactivty=[];
var peoplelist=[];

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
				" SELECT USER_A_ID, FIRST_NAME, LAST_NAME "
			 +  " FROM RELATION, APP_USER "
			 +  " WHERE USER_A_ID = USER_ID AND USER_B_ID = :user_bid AND STATUS = 2 ",[userProfile.id],
				function(err, result1)
				{
					if (err) { console.error(err); return; }
					// console.log(result1);
					friendrequest = result1.rows;
					connection.execute(
						" SELECT A.FIRST_NAME, B.BUSINESS_NAME, UR.SELF_REVIEW "
					 +  " FROM USER_REVIEW UR, APP_USER A, BUSINESS B "
					 +  " WHERE UR.USER_ID = A.USER_ID AND UR.BUSINESS_ID = B.BUSINESS_ID AND UR.USER_ID = :user_id ",[userProfile.id],
						function(err, result2)
						{
							if (err) { console.error(err); return; }
							
							personalreview = result2.rows;
							// console.log("personalreview");
							// console.log(personalreview);
							connection.execute(
								" SELECT UA.USER_ID, UA.BUSINESS_ID, UA.ACTIVITY_TIME, UA.ACTIVITY_COMMENT, B.BUSINESS_NAME, UA.ADD_TIME "
							 +  " FROM USER_ACTIVITY UA, BUSINESS B "
							 +  " WHERE UA.BUSINESS_ID = B.BUSINESS_ID AND UA.USER_ID = :user_id ",[userProfile.id],
								function(err, result3)
								{
									if (err) { console.error(err); return; }
							
									personalactivity= result3.rows;
									console.log("personalactivity");
									console.log(personalactivity);
									connection.execute(
										" SELECT A.FIRST_NAME, A.LAST_NAME, AP.ACTIVITY_ID, AP.USER_ID "
									 +  " FROM APP_USER A, ACTIVITY_PEOPLE AP "
									 +  " WHERE A.USER_ID = AP.USER_ID AND AP.ACTIVITY_ID in "
									 +  " (SELECT UA.ADD_TIME FROM USER_ACTIVITY UA WHERE UA.USER_ID = :user_id)", [userProfile.id],
										function(err, result4)
										{
											if (err) { console.error(err); return; }
							
											peoplelist= result4.rows;
											console.log("peoplelist");
											console.log(peoplelist);
											res.render('personalactivities', { friendrequest: friendrequest, personalreview: personalreview, personalactivity: personalactivity, peoplelist: peoplelist, userGivenName: userProfile.name.givenName});
										});
								});
						});
				});
		}
    );
});

module.exports = router;
