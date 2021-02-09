const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

const imageSchema = new mongoose.Schema({
    imageName: { type: String, default: "none", required: true},
    imageData: { type: String, required: true}
});

const Image = mongoose.model('Image', imageSchema);

function validateImage(image){
    const schema = Joi.object({
        imageName: Joi.string().required(),
        imageData: Joi.string().required(),
    });
    return schema.validate(image);
}

exports.Image = Image;
exports.validateImage = validateImage;
exports.imageSchema = imageSchema;