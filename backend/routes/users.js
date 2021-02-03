const {User, validateUser} = require ('../models/user.js');
const bcrypt = require ('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

//get users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (ex) {
        return res.status(500).send(`Internal server Error: ${ex}`);
    }
});

//get a user
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        return res.send(user);
    } catch (ex) {
        return res.status(500).send(`Internal server Error: ${ex}`);
    }
});

//new user
    router.post('/login', async (req, res) => {
    try{
        const{ error } = validateUser(req.body);

        if (error)
         return res.status(500).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        const salt = await bcrypt.genSalt(10);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
        });

        await user.save();

        const token = jwt.sign(
            { _id: user._id, name: user.name},
            config.get('jwtSecret')
        );

        return res
        .header('x-auth-token', token)
        .header('access-control-expose-headers', 'x-auth-token')
        .send({ _id: user._id, name: user.name, email: user.email});
    } catch (ex) {
        return res.status(500).send(`InternalServerError:${ex}`);
    }
});

 module.exports = router;
