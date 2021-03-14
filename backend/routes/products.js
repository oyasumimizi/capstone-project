const mongoose = require("mongoose");
const {Product, validate} = require('../models/product');
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "/uploads/" });

router.get("/:itemId", async (req, res) => {
  try {
    const products = await product.findById(req.params.id);

    if (!product)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" does not exist.`);
    return res.send(products);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", upload.single("productImage"), async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    console.log(req.file);
    const product = new product({
      productId: req.body.id,
      itemName: req.body.itemName,
      description: req.body.description,
      price: req.body.price,
      countInStock: req.body.countInStock,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
    });
    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:itemId", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const product = await product.findByIdAndUpdate(
      req.params.id,
      {
        itemName: req.body.itemName,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
      },
      { new: true }
    );
    if (!product)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" does not exist.`);

    await product.save();

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comments = await product.findByIdAndRemove(req.params.id);

    if (!product)
      return res
        .status(400)
        .send(`The product with id "${req.params.id}" does not exist.`);

    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
