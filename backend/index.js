require("dotenv").config();
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const users = require('./routes/users');
const cors = require('cors');
const bodyParser = require('body-parser');
const validate = require('./routes/auth');
const products = require('./routes/products');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/user', users);
app.use('/api/validate', validate)
app.use("/api/products", products);
app.use("/api/upload", )
//endpoint to login is /user/login

var port = process.env.PORT || '5000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
});


connectDB();