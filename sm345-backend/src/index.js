require('dotenv').config();
const {
    PORT: port,
    MONGO_URI: mongoURI
} = process.env;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const api = require('./routes');

const app = express();

// Database
const db = require('./db');
db.connect();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(busboyBodyParser());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

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