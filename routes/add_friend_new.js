var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');

router.get('/', function(req, res, next) {
	console.log("here");
	res.render('add_friend_new', { title: 'Login' });
});
module.exports = router;