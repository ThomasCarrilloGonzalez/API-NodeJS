const { Router } = require("express");
const router = Router();

const pais = require("../controllers/pais.controller.js");

// Create a new Customer
router.post("/pais", pais.create);

// Retrieve all Customers
router.get("/pais", pais.findAll);

// Retrieve a single Customer with customerId
router.get("/pais/:PaisID", pais.findOne);

// Update a Customer with customerId
router.put("/pais/:PaisID", pais.update);

// Delete a Customer with customerId
router.delete("/pais/:PaisID", pais.delete);

// Create a new Customer
router.delete("/pais", pais.deleteAll);

module.exports = router;
