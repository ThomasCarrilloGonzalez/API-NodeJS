const Perfil = require("../models/perfil.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const perfil = new Perfil({
    PerfilID: req.body.PerfilID,
    UsuarioID: req.body.UsuarioID,
    PerfilNombre: req.body.PerfilNombre,
    PerfilApellido: req.body.PerfilApellido,
    PerfilTelefono: req.body.PerfilTelefono,
    PerfilDireccion: req.body.PerfilDireccion,
    PaisID: req.body.PaisID,
  });

  // Save Customer in the database
  Perfil.create(perfil, (err, data) => {
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
  Perfil.getAll((err, data) => {
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
  Perfil.findById(req.params.PerfilID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.PerfilID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.PerfilID,
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

  Perfil.updateById(req.params.PerfilID, new Perfil(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.PerfilID}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Customer with id " + req.params.PerfilID,
        });
      }
    } else res.send(data);
  });
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Perfil.remove(req.params.PerfilID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.PerfilID}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.PerfilID,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Perfil.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
