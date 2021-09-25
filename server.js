'use strict'

const express = require('express');

// modules resources
const app = express();

// import handlers
const notFoundHandler = require('./handlers/404.js');
const errHandler = require('./handlers/500.js');
const stamper = require('./middleware/stamper.js');
const logger = require('./middleware/logger.js');

// moved to handlers dir
// create some handlers
// function notFoundHandler(req,res) {
//     res.status(404).send({
//         error: 404,
//         route: req.path,
//         message: 'Not Found'
//     })
// }

// function errHandler(error, req, res, next) {
//     res.status(500).send({
//         error: 500,
//         route: res.path,
//         query: req.query,
//         body: req.body,
//         message: `SERVER ERROR ${error.message}`
//     })
// }

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

start(3000);