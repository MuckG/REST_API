'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connect(process.env.DATABASE_URL1, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.set('views', __dirname, './views');
app.set('view engine', 'ejs');

app.use('/', (req, res) => {
    // res.send("<h1>Hello</h1>");
    res.render('index');
})
// const subscribersRouter = require('./routes/subscribers.js');
// app.use('/subscribers', subscribersRouter); //any path starting with subscribers will use the subscribers router

const subscribersPostRouter = require('./routes/postSubscriber.js');
app.use('/subscribers/create', subscribersPostRouter);

const subscribersDeleteRouter = require('./routes/deleteSubscriber.js');
app.use('/subscribers/delete', subscribersDeleteRouter);

const subscribersPatchRouter = require('./routes/patchSubscriber.js');
app.use('/subscribers/update', subscribersPatchRouter);

const subscribersGetRouter = require('./routes/getSubscriber.js');
app.use('/subscribers/get', subscribersGetRouter);



app.listen(3000, () => console.log('Server started'));