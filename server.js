// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config = require('./config');
var Player = require('./app/models/player');
 // set the 'dbUrl' to the mongodb url that corresponds to the
 // environment we are in
app.set('dbUrl', config.db[app.settings.env]);
 // connect mongoose to the mongo dbUrl
mongoose.connect(app.get('dbUrl'));
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
    console.log("yay!")
  });

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/players')

  .post(function(req, res) {
    var player = new Player();
    player.name = req.body.name;
    player.save(function(err) {
      res.send(err)
    });
    res.json({ message: 'Player created!' });
  })

  .get(function(req, res) {
    Player.find(function(err, players) {
      if (err)
        res.send(err);

    res.json(players);
    });
  });

router.route('/players/:player_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
  .get(function(req, res) {
    Player.findById(req.params.player_id, function(err, player) {
      if (err)
        res.send(err);
      res.json(player);
    });
  })

  .put(function(req, res) {
    // use our bear model to find the bear we want
    Player.findById(req.params.player_id, function(err, player) {
      if (err)
        res.send(err);
      player.name = req.body.name;  // update the bears info
      // save the bear
      player.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Player updated!' });
      });
    });
  });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);