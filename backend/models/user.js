const mongoose = require('mongoose');
const Joi = require('joi');
const cors = require('cors');
const config = require('config');
const jwt = require('jsonwebtoken');
const { productSchema } = require('./Product');
const { reviewSchema } = require('./review');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50},
    email: {type: String, unique: true, required: true, minlength: 5, maxlength: 255},
    password: {type: String, required: true, maxlength: 1024, minlength: 5},
    timestamp: { type: Date, default: Date.now() },
    shoppingCart: {type: [productSchema], default: []},
    newSalePost: {type: [productSchema], default: []},
    review: {type: [reviewSchema], default: []}
});

const User = mongoose.model('User', userSchema);

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, name: this.name, isAdmin: this.isAdmin}, config.get('jwtSecret'));
};

function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);

}

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;