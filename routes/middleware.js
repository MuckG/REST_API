const express = require('express');
const Subscriber = require('../models/subscriber');

//middleware
async function getSubscriber(req, res, next) {
    let subscriber;
    try{
        console.log(req.params.id);
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber === null){
            return res.status(404).json({ message: 'Cannot find subscriber'});
        }
    }
    catch(err) {
        return res.status(500).json({ message: err.message });
    }

    res.subscriber = subscriber;
    next();
}

module.exports = {
    getSubscriber
};