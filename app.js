'use strict';
const express = require('express');
const app = express();
const routes = require('./routes.js');
const logger = require('morgan');
const bodyParser = require('body-parser').json();
let port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(bodyParser);
app.use('/questions', routes);
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            err: err.message
        }
    });
});
app.listen(3000, () => {
    console.log('App is listening at port 3000');
});