const express = require("express");
const app = express();
const { getCategories } = require("./controllers/categoriesControllers");

app.get("/api/categories", getCategories);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Sorry, invalid path." });
});

module.exports = app;
