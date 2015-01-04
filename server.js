var express = require('express');       
var app = express();                
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose   = require('mongoose');
var config = require('./config');
var methodOverride = require('method-override');
var Player = require('./app/models/player');
var port = process.env.PORT || 3000;       

app.set('dbUrl', config.db[app.settings.env]);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/public'));  

mongoose.connect(app.get('dbUrl'));
var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {
    console.log("yay!")
});

app.get('*', function(req, res) {
  res.sendfile('./public/views/index.html');   
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
  .get(function(req, res) {
    Player.findById(req.params.player_id, function(err, player) {
      if (err)
        res.send(err);
      res.json(player);
    });
  })

  .put(function(req, res) {
    Player.findById(req.params.player_id, function(err, player) {
      if (err)
        res.send(err);
      player.name = req.body.name;
      player.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Player updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Player.remove({
      _id: req.params.player_id
    }, function(err, player) {
      if (err)
        res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
  });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);