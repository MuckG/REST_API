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

const subscribersRouter = require('./routes/subscribers.js');
app.use('/subscribers', subscribersRouter); //any path starting with subscribers will use the subscribers router

app.listen(3000, () => console.log('Server started'));