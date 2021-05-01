const Country = require("../models/world/countries.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const country = new Country({
    CountryCode: req.body.Code,
    CountryName: req.body.Name,
    CountryContinent: req.body.Continent,
    CountryRegion: req.body.Region,
    CountrySurfaceArea: req.body.SurfaceArea,
    CountryIndepYear: req.body.IndepYear,
    CountryPopulation: req.body.Population,
    CountryLifeExpectancy: req.body.LifeExpectancy,
    CountryGNP: req.body.GNP,
    CountryGNPOld: req.body.GNPOld,
    CountryLocalName: req.body.LocalName,
    CountryGovernmentForm: req.body.GovernmentForm,
    CountryHeadOfState: req.body.HeadOfState,
    CountryCapital: req.body.Capital,
    CountryCode2: req.body.Code2,
  });

  // Save Customer in the database
  Country.create(country, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Country.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Country.findById(req.params.Code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.Code}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.Code,
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
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Country.updateById(req.params.Code, new Country(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.Code}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.Code,
        });
      }
    } else res.send(data);
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Country.remove(req.params.Code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.Code}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.Code,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Country.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
