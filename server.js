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
app.get('/surface/dictionary', function (req, res) {
  var param = "";
  if(req.param('isPaging')) param += "&isPaging=" + req.param('isPaging');
  if(req.param('pageNo')) param += "&pageNo=" + req.param('pageNo');
  if(req.param('pageSize')) param += "&pageSize=" + req.param('pageSize');
  if(req.param('name')) param += "&name=" + encodeURI(req.param('name'));
  if(req.param('code')) param += "&code=" + encodeURI(req.param('code'));
  if(req.param('parentId')) param += "&parentId=" + req.param('parentId');
  param = param.length > 0 ? "?" + param.substr(1) : "";
  request.get(Api.testServer+'dictionary' + param, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
    }
    else if(!error && response.statusCode == 204){
        res.json({list: [], totalCount: 0, pageSize: 10, pageNo: 1,});
    }
    else{
        res.end('a '+error)
    }
  });
});
app.delete("/surface/dictionary/:id", function(req, res){
  var param = "";
  if(req.param('id')) param += "/" + req.param('id');
  console.log(req.param("id"));
  request.delete(Api.testServer+'dictionary' + param, function (error, response, body) {
    console.log(Api.testServer+'dictionary' + param, response.statusCode);
    //res.json(JSON.parse({statusCode: response.statusCode, error: error, body: body}));
    if (!error && response.statusCode == 200) {
        res.json({res: true});
    }
    else{
        res.end('a '+error)
    }
  });
});
app.get('/rtGpsData', function (req, res) {
  var param = "";
  if(req.param('carCode')) param += "&carCode=" + req.param('carCode');
  if(req.param('carPlate')) param += "&carPlate=" + req.param('carPlate');
  if(req.param('simNumber')) param += "&simNumber=" + req.param('simNumber');
  if(req.param('accStatus')) param += "&accStatus=" + req.param('accStatus');
  if(req.param('logitude')) param += "&logitude=" + req.param('logitude');
  if(req.param('latitude')) param += "&latitude=" + req.param('latitude');
  param = param.length > 0 ? "?" + param.substr(1) : "";
  request.get(Api.testServer+'rtGpsData' + param, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body));
    }
    else if(!error && response.statusCode == 204){
        res.json({list: [], totalCount: 0, pageSize: 10, pageNo: 1,});
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
app.get('*/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(3000, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});