'use strict'

const express = require('express');


// modules resources
const app = express();

// import handlers
const notFoundHandler = require('./handlers/404.js');
const errHandler = require('./handlers/500.js');
const stamper = require('./middleware/stamper.js');
const logger = require('./middleware/logger.js');

// create some handlers


// create come routes
app.get('/', logger, (req, res) => {
    res.status(200).send('You made it!')
});

app.get('/bad', (req, res) => {
    throw new Error('You got racked!')
    next()
});

app.get('/data', (req, res) => {
    let outputObject = {
        message: "Give a dog a bone",
        result: "Knick knack paddy whack"
    }
    res.status(200).json(outputObject);
});

// use handlers
app.use('*', notFoundHandler);
app.use(errHandler);
app.use(logger);
app.use(stamper);

// create start function
function start(port) {
    app.listen(port, () => console.log(`Server is up on port ${port}`)) 
}

module.exports = {
    app: app,
    start: start
}
    