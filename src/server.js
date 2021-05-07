const express = require("express");
const cors = require("cors");
const database = require("./util/database");
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./util/errorHandling");

const productRouter = require("./services/product");
const categoryRouter = require("./services/category");
const reviewRouter = require("./services/review");
const listEndpoints = require("express-list-endpoints");

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/review", reviewRouter);
server.use("/category", categoryRouter);
server.use("/product", productRouter);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

database.sequelize.sync({ force: false }).then((result) => {
  server.listen(port, () => {
    console.log("Server is protecting their chips from ", port, " seagulls"),
      console.table(listEndpoints(server));
  });
});
