const { Router } = require("express");
const router = Router();

const facturacion = require("../controllers/facturacion.controller.js");

// Create a new Customer
router.post("/facturacion", facturacion.create);

// Retrieve all Customers
router.get("/facturacion", facturacion.findAll);

// Retrieve a single Customer with customerId
router.get("/facturacion/:FacturacionID", facturacion.findOne);

// Update a Customer with customerId
router.put("/facturacion/:FacturacionID", facturacion.update);

// Delete a Customer with customerId
router.delete("/facturacion/:FacturacionID", facturacion.delete);

// Create a new Customer
router.delete("/facturacion", facturacion.deleteAll);

module.exports = router;
