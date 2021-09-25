'use strict'

module.exports = (req, res, next) => {
    console.log('You are logging!');
    next()
}