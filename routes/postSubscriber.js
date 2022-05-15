const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const middleware = require('./middleware');

//Creating a subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    });

    //save this informaion
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber); //201 = successfully created an object
    }
    catch(err) {
        res.status(400).json({ message: err.message }); // 400 means bad user data
    }
});

module.exports = router;