require('dotenv').config();
const {
    PORT: port,
    MONGO_URI: mongoURI
} = process.env;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const db = require('./db');
const passport = require('passport');

const api = require('./routes');

const app = express();

// Database
db.connect();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


app.get('/', function(req, res) {
    res.send('express')
})

// Routing
app.use('/api', api);

/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen
app.listen(port, () => {
    console.log('Express is listening on port', port)
})