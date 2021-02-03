const googleTrends = require('./node_modules/google-trends-api');
const express = require('express');
var cors = require('cors');
const app = express();
var port = process.env.PORT || 3000;

var corsOptions = {
  origin: 'https://roamresearch.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), (req, res) => {
	
	var mode = req.query.mode;
	
	if (req.query.country) {
	var country = req.query.country;
	} else {
		console.log("Please supply a Country! Defaulting to US.");
		var country = "US";
	}
	
	if (mode == "DT") {
	googleTrends.dailyTrends({
	  geo: country,
	}, function(err, results) {
	  if (err) {
		console.log(err);
	  }else{
		res.json(results);
	  }
	});
	} else if (mode == "cat") {
		if (req.query.category) {
			var cat = req.query.category;
		} else {
			var cat = "all";
		}
		googleTrends.realTimeTrends({
		geo: 'US',
		category: cat,
		}, function(err, results) {
			if (err) {
				console.log(err);
			} else {
				res.json(results);
			} 
		});
	}
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})