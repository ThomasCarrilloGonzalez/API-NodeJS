const Contrato = require("../models/contrato.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "No puede estar vacío",
    });
  }

  // Create a Customer
  const contrato = new Contrato({
    ContratoID: req.body.ContratoID,
    ContratoRazon: req.body.ContratoRazon,
    ContratoRut: req.body.ContratoRut,
    PerfilID: req.body.PerfilID,
    ContratoFechaInicio: req.body.ContratoFechaInicio,
    ContratoFechaFin: req.body.ContratofechaFin,
  });

  // Save Customer in the database
  Contrato.create(contrato, (err, data) => {
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
  Contrato.getAll((err, data) => {
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
  Contrato.findById(req.params.ContratoID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se ecnontro ningún Contrato con este ID ${req.params.ContratoID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "ERROR al recibir Contrato con este ID " + req.params.ContratoID,
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
      message: "No puede estar vacío",
    });
  }

  console.log(req.body);

  Contrato.updateById(
    req.params.ContratoID,
    new Contrato(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro ningún Contrato con este ID ${req.params.ContratoID}.`,
          });
        } else {
          res.status(500).send({
            message: "ERROR Actualizando contrato  " + req.params.ContratoID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Contrato.remove(req.params.ContratoID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro Contrato con ese ID ${req.params.ContratoID}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.ContratoID,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Contrato.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
