const { fetchCategories } = require("../models/categoriesModels");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next); //if there is an error, move to the next endpoint
};
