const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const middleware = require('./middleware');

//Updating a subscriber. Using patch as we only want to update the new details received
router.patch('/:id', middleware.getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name;
    }

    if(req.body.subscribeToChannel != null) {
        res.subscriber.subscribeToChannel = req.body.subscribeToChannel;
    }

    //update the user
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch(err) {
        res.status(400).json({ message: err.mesage })
    }
});

module.exports = router;