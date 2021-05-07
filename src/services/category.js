const express = require("express");
const Category = require("../util/database").Category;
const Product = require("../util/database").Product;
const Review = require("../util/database").Review;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allCategory = await Category.findAll({ include: [Product] });
    res.status(200).send(allCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    if (req.params.id > 0) {
      const singleCategory = await Category.findByPk(req.params.id, {
        include: [Product],
      });
      res.status(200).send(singleCategory);
    } else {
      const allProduct = await Product.findAll({
        include: [Category, Review],
      });
      res.status(200).send(allProduct);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const alteredCategory = await Category.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(alteredCategory);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Category.destroy({
      where: { id: req.params.id },
    });
    res.send("Product Deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
