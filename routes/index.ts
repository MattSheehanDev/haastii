/*
 * GET /
 */
import express = require('express');

import globals = require('./state');
var state = globals.state;



export function index(req: express.Request, res: express.Response) {
    var now = Date.now();
    var then = state.expires ? state.expires.getTime() : 0;


    var diffTimeMilliseconds = then - now;


    if (diffTimeMilliseconds < 0) {
        res.redirect('/expired');
        return;
    }


    res.render('index', {
        title: state.title,
        menu: state.place,
        time: diffTimeMilliseconds
    });
};
