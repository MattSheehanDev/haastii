/*
 * GET users listing.
 */
import express = require('express');

export function list(req: express.Request, res: express.Response) {
    res.send("respond with a resource");
};



import globals = require('./state');
var state = globals.state;


class Order {

		public name: string;
		public order: string;
		public special: string;
		
    constructor(name: string, order: string, special: string) {
				this.name = name;
				this.order = order;
				this.special = special
    }
}

var userOrders = [];


export function orders(req: express.Request, res: express.Response) {
    res.render('orders', {
        title: state.title,
        orders: userOrders
    });
}


export function expired(req: express.Request, res: express.Response) {
    var diffTime = (state.expires ? state.expires.getTime() : 0) - Date.now();

    res.render('expired', {
        title: state.title,
        time: diffTime
    });
}

export function success(req: express.Request, res: express.Response) {
		res.render('success', {
				title: state.title
		});
}


export function create(req: express.Request, res: express.Response) {

    res.render('create', {
        title: state.title
    });
}



export function createOrder(req: express.Request, res: express.Response) {
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


export function addOrder(req: express.Request, res: express.Response) {
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
