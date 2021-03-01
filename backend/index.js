require("dotenv").config();
const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const users = require('./routes/users');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const validate = require('./routes/auth');
const products = require('./routes/products');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', users);
app.use('/api/validate', validate)
app.use("/api/products", products);
//endpoint to login is /user/login

//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}


var port = process.env.PORT || '5000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
});


connectDB();

