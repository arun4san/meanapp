const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var config = global.config = require('./config.js');

// Get our API routes
const api = require('./server/routes/api');


const port = config.http.port;

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


app.listen(port, function(){
	console.log("Server running on localhost: "+port);
})