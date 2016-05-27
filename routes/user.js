"use strict";
function list(req, res) {
    res.send("respond with a resource");
}
exports.list = list;
;
var globals = require('./state');
var state = globals.state;
var Order = (function () {
    function Order(name, order, special) {
        this.name = name;
        this.order = order;
        this.special = special;
    }
    return Order;
}());
var userOrders = [];
function orders(req, res) {
    res.render('orders', {
        title: state.title,
        orders: userOrders
    });
}
exports.orders = orders;
function expired(req, res) {
    var diffTime = (state.expires ? state.expires.getTime() : 0) - Date.now();
    res.render('expired', {
        title: state.title,
        time: diffTime
    });
}
exports.expired = expired;
function success(req, res) {
    res.render('success', {
        title: state.title
    });
}
exports.success = success;
function create(req, res) {
    res.render('create', {
        title: state.title
    });
}
exports.create = create;
function createOrder(req, res) {
    // clear previous orders
    userOrders.length = 0;
    // get request parameters
    var place = req.body['place'];
    var time = req.body['time'];
    var units = req.body['units'];
    if (!place || !time) {
        res.status(200).end();
        return;
    }
    var date = new Date();
    if (units.toLowerCase() == "minutes") {
        date.setMinutes(date.getMinutes() + parseInt(time, 10));
    }
    else {
        date.setHours(date.getHours() + parseInt(time, 10));
    }
    state.place = place;
    state.expires = date;
    res.status(200).end();
}
exports.createOrder = createOrder;
function addOrder(req, res) {
    var name = req.body['name'];
    var order = req.body['order'];
    var special = req.body['special'];
    if (!name || !order) {
        res.status(404).end();
        return;
    }
    console.log(special);
    var newOrder = new Order(name, order, special);
    userOrders.push(newOrder);
    res.status(200).end();
}
exports.addOrder = addOrder;
