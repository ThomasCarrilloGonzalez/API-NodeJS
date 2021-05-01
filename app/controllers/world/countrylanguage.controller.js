const Countrylanguage = require("../models/countrylanguages.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const countrylanguage = new Countrylanguage({

    CountrylanguageCountryCode: req.body.CountryCode,
    CountrylanguageLanguage: req.body.Language,
    CountrylanguageIsOfficial: req.body.IsOfficial,
    CountrylanguagePercentage: req.body.Percentage,
  });

  // Save Customer in the database
  Countrylanguage.create(countrylanguage, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Countrylanguage.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Countrylanguage.findById(req.params.CountryCode                      , (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.CountryCode                      }.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.CountryCode                      
        });
      }
    } else res.send(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Countrylanguage.updateById(
    req.params.CountryCode                      ,
    new Country(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.CountryCode                      }.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Customer with id " + req.params.CountryCode                      
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Countrylanguage.remove(req.params.CountryCode                      , (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.CountryCode                      }.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.CountryCode                      
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Countrylanguage.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
