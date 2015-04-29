var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
var activity_list = [];
var name_list = [];
router.get('/', function(req, res, next) {	
	oracledb.getConnection(
	  {
	    user          : "myusername",
	    password      : "mypassword",
	    connectString : "mydbinstance.cojoy7d62wsg.us-east-1.rds.amazonaws.com/MYDB"
	  },
	  function(err, connection)
	  {
		  if(name_list.length!=0){
			  name_list = [];
		  }
	    if (err) { console.error(err); return; }
	    connection.execute(
	      "SELECT A.FIRST_NAME, A.LAST_NAME, B.BUSINESS_NAME, UA.ACTIVITY_TIME, UA.ACTIVITY_COMMENT, UA.ADD_TIME, UA.USER_ID "+
		  "FROM APP_USER A, BUSINESS B, USER_ACTIVITY UA "+
		  "WHERE B.BUSINESS_ID = UA.BUSINESS_ID AND UA.USER_ID = A.USER_ID AND UA.USER_ID != :user_id order by UA.ADD_TIME",[userProfile.id],
	      function(err, result)
	      {
	        if (err) { console.error(err); return; }
			activity_list = result.rows;
			console.log("activity_list");
	        console.log(activity_list);
			for(var i = 0; i < activity_list.length; i++){
				connection.execute(
					"select A.LAST_NAME, A.FIRST_NAME, AP.ACTIVITY_ID "+ 
					"from ACTIVITY_PEOPLE AP, APP_USER A, USER_ACTIVITY UA "+ 
					"where AP.ACTIVITY_ID = UA.ADD_TIME AND AP.USER_ID = A.USER_ID AND AP.ACTIVITY_ID = :activity_id order by AP.ACTIVITY_ID",[activity_list[i][5]],
					function(err, result2)
					{
						if (err) { console.error(err); return; }
							name_list.push(result2.rows);
						 console.log("name_list");
						 console.log(name_list);
					});		
			}	
	      });
	  });
			activity_list.sort(function(a,b) { return parseFloat(a[5]) - parseFloat(b[5]) } );
			name_list.sort(function(a,b) { return parseFloat(a[0][2]) - parseFloat(b[0][2]) } );
			res.render('friendsactivities', { activitylist: activity_list, namelist: name_list, userid: userProfile.id});
		});
		module.exports = router;
