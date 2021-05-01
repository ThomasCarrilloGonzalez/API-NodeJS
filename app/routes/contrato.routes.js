const { Router } = require("express");
const router = Router();

const contrato = require("../controllers/contrato.controller.js");

// Create a new Customer
router.post("/contrato", contrato.create);

// Retrieve all Customers
router.get("/contrato", contrato.findAll);

// Retrieve a single Customer with customerId
router.get("/contrato/:ContratoID", contrato.findOne);

// Update a Customer with customerId
router.put("/contrato/:ContratoID", contrato.update);

// Delete a Customer with customerId
router.delete("/contrato/:ContratoID", contrato.delete);

// Create a new Customer
router.delete("/contrato", contrato.deleteAll);

module.exports = router;
