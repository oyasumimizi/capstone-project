const { required } = require("joi");

const {User, validateUser} = require ('../models/user.js');
const bcrypt = require ('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const { required } = require('joi');
const router = express.Router;

router.post('/', async (req, res) => {
    try{
        const{ error } = validateUser(req.body);

        if (error) return res.status(400).send(error.details[0].message);

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
    }
}
});

 module.exports = router;