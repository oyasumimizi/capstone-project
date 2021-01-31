const Joi = require('joi');
const bcrypt = require('bcrypt');
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const User = require('./models/user.js');
const router = express.router;
const mongoose = require('mongoose')
const cors = require('cors');
const validate = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/api/user', validate);

var port = process.env.PORT || '5000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
});


connectDB();