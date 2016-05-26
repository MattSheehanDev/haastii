"use strict";
var globals = require('./state');
var state = globals.state;
function index(req, res) {
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
}
exports.index = index;
;
