const express = require('express');

const bodyParser = require('body-parser')
const config = require('config-lite')(__dirname);
const path = require('path')
const router = require('./routes')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};

app.use(allowCrossDomain)

app.use(express.static('public'))
      
router(app)

app.listen(config.port, () => {
  console.log(`server is running at http://localhost:${config.port}`);
});
