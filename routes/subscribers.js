const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

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
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

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

//Updating a subscriber. Using patch as we only want to update the new details received
router.patch('/:id', getSubscriber, async (req, res) => {
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

//Deleting a subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try{
        await res.subscriber.remove();
        res.json({ message: `Deleted subscriber ${res.subscriber.name}`})
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

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

module.exports = router;