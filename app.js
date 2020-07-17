// import modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Models
const Destinations = require('./models/destinations.js');

// create express appS
const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Hide creds from repo
const mongoDB = process.env.MONGODB_URL;

// Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set a callback to let us know we've successfully connected
db.once('open', function() {
  console.log('Connected to DB...');
});


// Endpoint handler for the home page
app.get('/', function(request, response){
  response.render('index',{});
});

app.get('/login', function(request, response){
  response.render('login',{});
});

app.get('/register', function(request, response){
  response.render('register',{});
});

app.get('/#contact', function(request, response){
  response.render('#contact',{});
});

app.get('/:id', function(request, response){
  
  Destinations.findOne({'id': request.params.id}, function(error, destinations) {
  
    if (!destinations) {
      return response.send('Invalid ID.');
    }
    
    response.render('destinations',destinations);
  });
});


app.get('/api/destinations', function(request, response){

  Destinations.find(function(error, destinations) { 
    response.json(destinations);
  });
});


app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});

