const express = require("express");
const Review = require("../util/database").Review;
const Product = require("../util/database").Product;

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).send(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allReview = await Review.findAll({ include: [Product] });
    res.status(200).send(allReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const singleReview = await Review.findByPk(req.params.id, {
      include: [Product],
    });
    res.status(200).send(singleReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const alteredReview = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(alteredReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Review.destroy({
      where: { id: req.params.id },
    });
    res.send("Review Deleted");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
