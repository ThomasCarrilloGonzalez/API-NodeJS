const { Router } = require("express");
const router = Router();

const login = require("../controllers/login.controller.js");

// Create a new Customer
router.post("/login", login.create);

// Retrieve all Customers
router.get("/login", login.findAll);

// Retrieve a single Customer with customerId
router.get("/login/:LoginID", login.findOne);

// Update a Customer with customerId
router.put("/login/:LoginID", login.update);

// Delete a Customer with customerId
router.delete("/login/:LoginID", login.delete);

// Create a new Customer
router.delete("/login", login.deleteAll);

module.exports = router;
