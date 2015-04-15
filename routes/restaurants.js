var oracledb = require('oracledb');
var express = require('express');
var router = express.Router();
var res_result = '';
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
				"select * from BUSINESS where ROWNUM  < 10",
				function(err, result)
				{
					if (err) { console.error(err); return; }
					res_result = result.rows;
					console.log(res_result);
				});
			});
			res.render('restaurants', { allrestaurants: res_result});
		});

		module.exports = router;