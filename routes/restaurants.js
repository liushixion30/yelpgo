var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
var res_result = '';
var hour_result = '';
var testVar = false;



/* GET users listing. */
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
				"select * from BUSINESS where ROWNUM  < 20",
				function(err, result)
				{
					if (err) { console.error(err); return; }
					
					connection.execute(
					      "INSERT INTO app_user VALUES (:USER_ID, :USER_PASSWORD, :FIRST_NAME, :LAST_NAME, :EMAIL)",[userProfile.id,'',userProfile.name.givenName,userProfile.name.familyName,userProfile.emails[0].value],
						{isAutoCommit: true},
						  function(err, result)
					      {
					        if (err) { console.error(err); return; }
					        console.log(result);
					      });
						
					res_result = result.rows;
					// // console.log(res_result);
					console.log("here:");
					console.log(userProfile.id);
					connection.execute(
						"select * from BUSINESS_HOURS where ROWNUM  < 20",
						function(err, result)
						{
							if (err) { console.error(err); return; }
							hour_result = result.rows;
							// console.log(hour_result);
						});
						
					
				});
			});
			if(!testVar){
			res.render('restaurants', { allrestaurants: res_result, restauranthours: hour_result, userid: userProfile.id});}
			
			
			
		});
		module.exports = router;