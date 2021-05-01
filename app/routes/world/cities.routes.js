const { Router } = require("express");
const router = Router();

const city = require("../../controllers/world/city.controller.js");

// Create a new Customer
router.post("/city", city.create);

// Retrieve all Customers
router.get("/city", city.findAll);

// Retrieve a single Customer with customerId
router.get("/city/:ID", city.findOne);

// Update a Customer with customerId
router.put("/city/:ID", city.update);

// Delete a Customer with customerId
router.delete("/city/:ID", city.delete);

// Create a new Customer
router.delete("/city", city.deleteAll);

module.exports = router;
