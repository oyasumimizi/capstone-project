const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const cors = require("cors");

const paymentSchema = new mongoose.Schema({
  user: { type: Array, default: [] },
  data: { type: Array, default: [] },
  product: { type: Array, default: [] },
});

const Payment = mongoose.model("Payment", paymentSchema);

function validatePayment(payment) {
  const schema = Joi.object({
    user: Joi.array().default(),
    data: Joi.array().default(),
    product: Joi.array().default(),
  });
  return schema.validate(review);
}

exports.paymentSchema = paymentSchema;
exports.Payment = Payment;
exports.validatePayment = validatePayment;
