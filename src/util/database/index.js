const { Sequelize, DataTypes } = require("sequelize");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Category = require("../models/Category");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() =>
    console.log(
      "------------------------------------------- Connection Established ---------------------------------------------"
    )
  )
  .catch((e) => {
    console.log(
      "-------------------------------------- Connection Failed ------------------------------------------------------"
    ),
      console.log(e);
  });

const models = {
  Product: Product(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;
