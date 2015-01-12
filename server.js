/*
 * Dilr.js
 * @author Antonio López Martínez
 * */

// Dependencies and requirements
var express             = require('express'),
    exphbs              = require('express-handlebars'),
    http                = require('http'),
    morgan              = require('morgan'),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    mongoose            = require('mongoose'),

    // Add the routes
    controller  = require('./routes/category'),
    router              = express.Router(),
    
    // Creates an express instance and set a port variable
    app                 = express(),
    port                = process.env.PORT || 8080;

// Set handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

app.use(express.static('www'));

app.use(morgan('dev'));                             // log every request to the console
app.use(bodyParser.urlencoded(
      {
        extended: true
      }
      ));

// pull information from HTML un POST
app.use(bodyParser.json());
app.use(methodOverride());                          // simulate DELETE and PUT

// MongoDB configuration
mongoose.connect('mongodb://127.0.0.1/dilr',
    function(err, res){
      if(err){
        console.log('error connecting to MongoDB Database. ' + err);
      }
    }
);

router.route('/category')
    .post(controller.add)
    .get(controller.findAll);

router.route('/category/name/:name')
      .get(controller.findByName);

router.route('/category/:id')
      .get(controller.findById)
      .put(controller.update)
      .delete(controller.remove);

app.use('/api', router);

var server = http.createServer(app).listen(port, function()
    {
      console.log('Dilr server listening on port ' + port + '(http://127.0.0.1:' + port + ')' );
    });

var io = require('socket.io').listen(server); 

