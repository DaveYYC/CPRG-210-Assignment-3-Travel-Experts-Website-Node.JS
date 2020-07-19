// Import modules //
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const moment = require('moment'); 

// Models //
const Destinations = require('./models/destinations.js');

// Creates the express app and show use of 'ejs' or 'pug' //
const app = express();
app.set('view engine', 'ejs');

// Automatically check if requested file is found in /public,
// if yes, return that file as a response to the browser //
app.use(express.static(path.join(__dirname, 'public')));

// Hide credentials from repo //
const mongoDB = process.env.MONGODB_URL;

// Set up default mongoose connection //
mongoose.connect(mongoDB, { useUnifiedTopology: true,useNewUrlParser: true });

// Get the default connection //
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors) //
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set a callback to let us know we've successfully connected //
db.once('open', function() {
  console.log('Congrats! You are connected to MongoDB...');
});

// Cors origin URL - Allow inbound traffic from origin //
corsOptions = {
  origin: "https://assignmentdh.herokuapp.com",
  optionsSuccessStatus: 200 
  };
  app.use(cors(corsOptions));

// Endpoint handler for the home page //
app.get('/', function(request, response){
  response.render('index',{});
});

// Endpoint handler for the login page //
app.get('/login', function(request, response){
  response.render('login',{});
});

// Endpoint handler for the register page //
app.get('/register', function(request, response){
  response.render('register',{});
});

app.get('/404', function(request, response){
  response.render('404',{});
});



// Endpoint handler for the contact section //
// app.get('/#contact', function(request, response){
//   response.render('contact',{});
// });

// Define an endpoint handler for the individual destinations pages //
app.get('/destinations:id', function(request, response){
  

// model.findOne returns the first object it finds //
// model.find will always return an array, even if it only finds one //
Destinations.findOne({'id': request.params.id}, function(error, destinations) {
  
  // Check for IDs that are not in the list //
  if (!destinations) {
    return response.send('Invalid ID.');
  }
  // Compile view and respond //
  response.render('destinations',destinations);
  });
});

// Create a JSON that returns the entire destinations //
// This is the endpoint that the frontend gallery script calls //
app.get('/api/destinations', function(request, response){

Destinations.find(function(error, destinations) { 
  response.json(destinations);
  });
});

// If no file or endpoint found, send a 404 error as a response to the browser //
app.use(function(req, res, next) {
  res.status(404);
    res.send('404');
});

// Start up server //
const PORT = process.env.PORT || 3000;
  app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});

