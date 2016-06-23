var express = require('express');
var app = express();

var morgan = require('morgan');
var bodyParser = require('body-parser');

var swig = require('swig');
var path = require('path');
/*var models = require('./models');*/
module.exports = app;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*models.User.sync({})
.then(function () {
    return models.Page.sync({force: true});
})
.then(function () {
  app.listen(3000, function () {
    console.log('listening to port 3000...');
  });
})
.catch(console.error);*/

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', function (req, res) {
   res.render('index');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});
