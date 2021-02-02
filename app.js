const googleTrends = require('./node_modules/google-trends-api');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
	var country = req.query.country;
	var date = req.query.date;
	
	googleTrends.dailyTrends({
	  trendDate: new Date(date),
	  geo: country,
	}, function(err, results) {
	  if (err) {
		console.log(err);
	  }else{
		res.json(results);
	  }
	});
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})