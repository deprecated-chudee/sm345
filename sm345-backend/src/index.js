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
const session = require('express-session');

const app = express();

const api = require('./routes');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

db.connect();

/* use session */
app.use(session({
    secret: 'SM$3$4$5',
    resave: false,
    saveUninitialized: true
}));

app.get('/', function(req, res) {
    res.send('express')
})

app.use('/api', api);

/* handle error */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port', port)
})