const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

const productSchema = new mongoose.Schema({
    itemName: { type: String, required: true},
    description: { type: String, required: true},
    price: {type: Number, required: true},
    countInStock: {type: Number, required: true },
    imageUrl: { type: String, required: true}
})

const Product = mongoose.model('product', productSchema);

function validateProduct(product){
    const schema = Joi.object({
        itemName: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        countInStock: Joi.number().required(),
        imageUrl: Joi.string().required(),
    });
    return schema.validate(user);

}

exports.Product = Product;
exports.validateProduct = validateProduct;
exports.productSchema = productSchema;