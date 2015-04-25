var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	var time = req.body.time;
	var userId = req.body.userid;
	var actId = req.body.actId;
	var comment = req.body.comment;
	console.log("test");
	console.log("time is = "+time + ", user id is = " + userId+", restaurant id = " + actId + ", comment is = " + comment);
	res.end("yes");
});

module.exports = router;
