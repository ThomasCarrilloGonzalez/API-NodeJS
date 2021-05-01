const { Router } = require("express");
const router = Router();

const countrylanguage = require("../controllers/countrylanguage.controller.js");

// Create a new Customer
router.post("/countrylanguage", countrylanguage.create);

// Retrieve all Customers
router.get("/countrylanguage", countrylanguage.findAll);

// Retrieve a single Customer with customerId
router.get("/countrylanguage/:Code", countrylanguage.findOne);

// Update a Customer with customerId
router.put("/countrylanguage/:Code", countrylanguage.update);

// Delete a Customer with customerId
router.delete("/countrylanguage/:Code", countrylanguage.delete);

// Create a new Customer
router.delete("/countrylanguage", countrylanguage.deleteAll);

module.exports = router;
