const Login = require("../models/login.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const login = new Login({
    LoginID: req.body.LoginID,
    UsuarioID: req.body.UsuarioID,
    LoginUbicacionLat: req.body.LoginUbicacionLat,
    LoginUbicacionLon: req.body.LoginUbicacionLon,
    LoginUbicacionAprox: req.body.LoginUbicacionAprox,
    LoginIP: req.body.LoginIP,
    LoginFechaConexion: req.body.LoginFechaConexion,
    LoginFechaDesconexion: req.body.LoginFechaDesconexion,
  });

  // Save Customer in the database
  Login.create(login, (err, data) => {
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
  Login.getAll((err, data) => {
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
  Login.findById(req.params.LoginID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.LoginID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.LoginID,
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

  Login.updateById(req.params.LoginID, new Login(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.LoginID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.LoginID,
        });
      }
    } else res.send(data);
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Login.remove(req.params.LoginID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.LoginID}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.LoginID,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Login.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
