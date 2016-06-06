var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');
var request = require('request');
var app = express();
var compiler = webpack(config);
var Api = require('./api');
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static('static'));

// test
app.get('/dictionary', function (req, res) {
  var isPaging = req.param('isPaging');
  var pageNum = req.param('pageNum');
  request(Api.dictionary+isPaging+'&pageNum='+pageNum, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }
  });
})
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