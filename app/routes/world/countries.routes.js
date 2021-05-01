const { Router } = require("express");
const router = Router();

const country = require("../controllers/country.controller.js");

// Create a new Customer
router.post("/country", country.create);

// Retrieve all Customers
router.get("/country", country.findAll);

// Retrieve a single Customer with customerId
router.get("/country/:Code", country.findOne);

// Update a Customer with customerId
router.put("/country/:Code", country.update);

// Delete a Customer with customerId
router.delete("/country/:Code", country.delete);

// Create a new Customer
router.delete("/country", country.deleteAll);

module.exports = router;
