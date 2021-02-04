const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');

const reviewSchema = new mongoose.Schema({
    postId: {type: String, required: true},
    // likes: {type: Number, default: 0}, //might add this as a feature
    // dislikes: {type: Number, default: 0},
    text: {type: String, required: true},
    postDate: {type: Date, default: Date.now()},
});

const Review = mongoose.model('Review', reviewSchema);


function validateReview(review){
    const schema = Joi.object({
        postId: Joi.string().required(),
        text: Joi.string().required(),
    });
    return schema.validate(review);
}

exports.reviewSchema = reviewSchema;
exports.Review = Review;
exports.validateReview = this.validateReview;
