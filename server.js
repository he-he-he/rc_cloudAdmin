var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
var request = require('request');
var app = express();
var compiler = webpack(config);
var Api = require('./api');

var callback = (error, response, body) => {
    if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
    }
    else if(!error && response.statusCode == 204){
        res.json([]);
    }
    else{
        res.end('a '+error)
    }
}

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static('static'));

// test
app.get('/dictionary', function (req, res) {
  var isPaging = req.param('isPaging');
  var pageNo = req.param('pageNo');
  var pageSize=req.param('pageSize')
  request.get(Api.testServer+'/dictionary?isPaging='+isPaging+'&pageNo='+pageNo+'&pageSize='+pageSize, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
    }
    else if(!error && response.statusCode == 204){
        res.json([]);
    }
    else{
        res.end('a '+error)
    }
  });
});
app.get('/rtGpsData', function (req, res) {
  var param = "";
  if(req.param('carCode')) param += "carCode=" + req.param('carCode');
  if(req.param('carPlate')) param += "&carPlate=" + req.param('carPlate');
  if(req.param('simNumber')) param += "&simNumber=" + req.param('simNumber');
  if(req.param('accStatus')) param += "&accStatus=" + req.param('accStatus');
  if(req.param('logitude')) param += "&logitude=" + req.param('logitude');
  if(req.param('latitude')) param += "&latitude=" + req.param('latitude');
  console.log(Api.testServer+'/rtGpsData?' + param);
  request.get(Api.testServer+'/rtGpsData?' + param, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
    }
    else if(!error && response.statusCode == 204){
        res.json({list: []});
    }
    else{
        res.end('a '+error)
    }
  });
});
app.get('/json/:file', function(req, res){
  res.sendFile(req.params.file, {root: __dirname + "/json/"});
});
// !test
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});