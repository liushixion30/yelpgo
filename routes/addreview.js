var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
	var review=req.body.review;
	var userId = req.body.userid;
	var resId = req.body.resId;
	console.log("Review is = "+review + ", user id is = " + userId+", restaurant id = " + resId);
	res.end("yes");
});

module.exports = router;
