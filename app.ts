#!/usr/bin/env node

/// <reference path="Scripts/typings/express/express.d.ts" />
/// <reference path="Scripts/typings/express/plugins.d.ts" />
/// <reference path="Scripts/typings/node/node.d.ts" />

import express = require('express');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');

import favicon = require('serve-favicon');
import logger = require('morgan');
import bodyParser = require('body-parser');
import methodOverride = require('method-override');
import errorHandler = require('errorhandler');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());


//import stylus = require('stylus');
//app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/orders', user.orders);
app.get('/expired', user.expired);
app.get('/success', user.success);
app.get('/create', user.create);

app.post('/create', user.createOrder);
app.post('/order', user.addOrder);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
