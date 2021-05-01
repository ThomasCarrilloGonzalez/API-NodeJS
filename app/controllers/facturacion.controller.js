const Facturacion = require("../models/facturacion.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Customer
  const facturacion = new Facturacion({
    FacturacionID: req.body.FacturacionID,
    FacturacionUltimaFecha: req.body.UsuarioID,
    FacturacionProximaFecha: req.body.UsuarioID,
    PerfilID: req.body.UsuarioID,
    MetodoPagoID: req.body.UsuarioID,
    FacturacionDireccion: req.body.UsuarioID,
    PaisID: req.body.UsuarioID,
    FacturacionEmail: req.body.UsuarioID,
    Facturaciontransaccion: req.body.UsuarioID,
    ContratoID: req.body.UsuarioID,
  });

  // Save Customer in the database
  Facturacion.create(facturacion, (err, data) => {
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
  Facturacion.getAll((err, data) => {
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
  Facturacion.findById(req.params.FacturacionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.FacturacionID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Customer with id " + req.params.FacturacionID,
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

  Facturacion.updateById(
    req.params.FacturacionID,
    new Facturacion(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.FacturacionID}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Customer with id " + req.params.FacturacionID,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Facturacion.remove(req.params.FacturacionID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.FacturacionID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Customer with id " + req.params.FacturacionID,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Facturacion.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};
