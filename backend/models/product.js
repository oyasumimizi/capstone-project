const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const config = require("config");
const cors = require("cors");

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      name: 5,
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    title: Joi.string().max(50),
    description: Joi.string(),
    price: Joi.number(),
    images: Joi.array(),
    sold: Joi.number().max(100),
    views: Joi.number(),
  });
  return schema.validate(product);
}

exports.productSchema = productSchema;
exports.Product = Product;
exports.validateProduct = validateProduct;
