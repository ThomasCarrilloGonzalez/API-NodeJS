const { Router } = require("express");
const router = Router();

const perfil = require("../controllers/perfil.controller.js");

// Create a new Customer
router.post("/perfil", perfil.create);

// Retrieve all Customers
router.get("/perfil", perfil.findAll);

// Retrieve a single Customer with customerId
router.get("/perfil/:PerfilID", perfil.findOne);

// Update a Customer with customerId
router.put("/perfil/:PerfilID", perfil.update);

// Delete a Customer with customerId
router.delete("/perfil/:PerfilID", perfil.delete);

// Create a new Customer
router.delete("/perfil", perfil.deleteAll);

module.exports = router;
