const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const middleware = require('./middleware.js');

//Deleting a subscriber
router.delete('/:id', middleware.getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove();
        res.json({ message: `Deleted subscriber ${res.subscriber.name}`})
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;