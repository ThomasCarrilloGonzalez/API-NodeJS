const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use(require("./app/routes/usuario.routes"));
app.use(require("./app/routes/contrato.routes"));
app.use(require("./app/routes/facturacion.routes"));
app.use(require("./app/routes/login.routes"));
app.use(require("./app/routes/pais.routes"));
app.use(require("./app/routes/perfil.routes"));

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
