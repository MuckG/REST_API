const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const middleware = require('./middleware');

//Get all subscribers
router.get('/', async (req, res) => {  //asyncronous method
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers);
    }
    catch (err) {
        //we're using a JSON api so send error as a JSON message
        res.status(500).json({ message: err.message });
    }
});

//Get one subscriber
router.get('/:id', middleware.getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

module.exports = router;