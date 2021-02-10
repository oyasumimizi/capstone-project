const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const config = require('config');
const { userSchema } = require('./user');

const productSchema = new mongoose.Schema({
    uploader: {type: [userSchema], default: []},
    productId: {type: String, required: true},
    itemName: { type: String, required: true},
    description: { type: String, required: true},
    price: {type: Number, required: true, default: 0},
    countInStock: {type: Number, required: true },
    tag: {type: String, required: true},
    dateModified: {type: Date, default: Date.now()},
    images: { type: Array, required: true, default: []},
    views: {type: Number, required: true, default: 0},
    sold: {type: Number, required: true, maxlength: 100, default: 0}
});

productSchema.index({ 
    title:'text',
    description: 'text',
}, 
{
    weights: {
        name: 5,
        description: 1,
    }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product){
    const schema = Joi.object({
        productId: Joi.string().required(),
        itemName: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        countInStock: Joi.number().required(),
        tag: Joi.string().required(),
        views: Joi.number().required(),
        sold: Joi.number().required().maxlength(100),
        images: Joi.array().required()
    });
    return schema.validate(product);
}

exports.Product = Product;
exports.validateProduct = validateProduct;
exports.productSchema = productSchema;