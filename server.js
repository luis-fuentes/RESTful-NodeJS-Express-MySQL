var express  = require('express');
var path     = require('path');
var bodyParser = require('body-parser');
var app = express();
var expressValidator = require('express-validator');

/*Set EJS template Engine*/
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true})); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection');
var mysql = require('mysql');

app.use(

    connection(mysql, {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'test',
      debug    : false //set true if you wanna see debug logger
    }, 'request')

);

app.get('/', function(req, res) {
  res.redirect('/user');
});

//RESTful route
var router = express.Router();
var index = require('./routes/index').router;
app.use('/', index);

//start Server
var server = app.listen(3000, function() {

  console.log('La Magia esta en el puerto: %s', server.address().port);

});
