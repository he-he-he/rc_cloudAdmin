var path = require('path');
var express = require('express');
var webpack = require('webpack');
var body = require("body-parser");
var config = require('./webpack.dev.config');
var request = require('request');
var app = express();
var compiler = webpack(config);
var Api = require('./api');

app.use(body.json());
app.use(body.urlencoded({extended: true}));

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
app.delete("/dictionary/:id", function(req, res){
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
app.post("/dictionary", function(req, res){
  var body = JSON.stringify(req.body);
  var option = {
    method: "post",
    url: Api.testServer+'dictionary',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: body
  };
  request(option, function(error, response, body){
    if (!error && response.statusCode == 200) {
        res.json({res: true});
    }
    else{
        res.end('a '+error)
    }
  });
});app.put("/dictionary/:id", function(req, res){
  var body = JSON.stringify(req.body);
  var param = "";
  if(req.param('id')) param += "/" + req.param('id');
  var option = {
    method: "put",
    url: Api.testServer+'dictionary/' + param,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: body
  };
  request(option, function(error, response, body){
    if (!error && response.statusCode == 200) {
        res.json({res: true});
    }
    else{
        res.end(body);
    }
  });
});
/**/
app.get('/carInfo', function (req, res) {
  console.log(req.query);
  var param = "";
  if(req.param('isPaging')) param += "&isPaging=" + req.param('isPaging');
  if(req.param('pageNo')) param += "&pageNo=" + req.param('pageNo');
  if(req.param('pageSize')) param += "&pageSize=" + req.param('pageSize');
  if(req.param('orderBy')) param += "&orderBy=" + req.param('orderBy');
  if(req.param('vinCode')) param += "&vinCode=" + encodeURI(req.param('vinCode'));
  if(req.param('simNum')) param += "&simNum=" + encodeURI(req.param('simNum'));
  if(req.param('carPlate')) param += "&carPlate=" + encodeURI(req.param('carPlate'));
  param = param.length > 0 ? "?" + param.substr(1) : "";
  request.get(Api.testServer+'carInfo' + param, function (error, response, body) {
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
app.delete("/carInfo/:id", function(req, res){
  var param = "";
  if(req.param('id')) param += "/" + req.param('id');
  console.log(req.param("id"));
  request.delete(Api.testServer+'carInfo' + param, function (error, response, body) {
    console.log(Api.testServer+'carInfo' + param, response.statusCode);
    //res.json(JSON.parse({statusCode: response.statusCode, error: error, body: body}));
    if (!error && response.statusCode == 200) {
        res.json({res: true});
    }
    else{
        res.end('a '+error)
    }
  });
});
app.post("/carInfo", function(req, res){
  var body = JSON.stringify(req.body);
  var option = {
    method: "post",
    url: Api.testServer+'carInfo',
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: body
  };
  request(option, function(error, response, body){
    if (!error && response.statusCode == 200) {
        res.json({res: true});
    }
    else{
        res.end('a '+error)
    }
  });
});app.put("/carInfo/:id", function(req, res){
  var body = JSON.stringify(req.body);
  var param = "";
  if(req.param('id')) param += "/" + req.param('id');
  var option = {
    method: "put",
    url: Api.testServer+'carInfo/' + param,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: body
  };
  request(option, function(error, response, body){
    if (!error && response.statusCode == 200) {
        res.json({res: true});
    }
    else{
        res.end(body);
    }
  });
});
/**/
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