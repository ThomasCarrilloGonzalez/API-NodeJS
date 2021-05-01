const { Router } = require("express");
const router = Router();

const usuario = require("../controllers/usuario.controller.js");

// Create a new Customer
router.post("/usuario", usuario.create);

// Retrieve all Customers
router.get("/usuario", usuario.findAll);

// Retrieve a single Customer with customerId
router.get("/usuario/:UsuarioID", usuario.findOne);

// Update a Customer with customerId
router.put("/usuario/:UsuarioID", usuario.update);

// Delete a Customer with customerId
router.delete("/usuario/:UsuarioID", usuario.delete);

// Create a new Customer
router.delete("/usuario", usuario.deleteAll);

module.exports = router;
