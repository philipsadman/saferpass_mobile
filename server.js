var request = require('request');
var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/static'));
app.use('/api', function(req, res) {
	var url = 'https://statpass.safer.com/' + req.url;
	req.pipe(request(url)).pipe(res);
});

app.listen(8000);