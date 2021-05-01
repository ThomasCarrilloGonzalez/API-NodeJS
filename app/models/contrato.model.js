const sql = require("./db.js");

// constructor
const Contrato = function (contrato) {
  this.ContratoID = contrato.ContratoID;
  this.ContratoRazon = contrato.ContratoRazon;
  this.ContratoRut = contrato.ContratoRut;
  this.PerfilID = contrato.PerfilID;
  this.ContratoFechaInicio = contrato.ContratoFechaInicio;
  this.ContratoFechaFin = contrato.ContratoFechaFin;
};

Contrato.create = (newContrato, result) => {
  sql.query("INSERT INTO contrato SET ?", newContrato, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    console.log("contrato Creado: ", { newContrato });
    result(null, { newContrato });
  });
};

Contrato.findById = (ContratoID, result) => {
  sql.query(
    `SELECT * FROM contrato WHERE ContratoID = ${ContratoID}`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Contrato Encontrado : ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Contrato.getAll = (result) => {
  sql.query("SELECT * FROM contrato", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log("Contratos : ", res);
    result(null, res);
  });
};

Contrato.updateById = (id, contrato, result) => {
  sql.query(
    "UPDATE contrato SET ContratoRazon = ?, ContratoRut = ?, PerfilID = ?, ContratoFechaInicio = ?, ContratoFechaFin = ? WHERE ContratoID = ?",
    [
      contrato.ContratoRazon,
      contrato.ContratoRut,
      contrato.PerfilID,
      contrato.ContratoFechaInicio,
      contrato.ContratoFechaFin,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Contrato Actualizado: ", { contrato });
      result(null, { contrato });
    }
  );
};

Contrato.remove = (id, result) => {
  sql.query("DELETE FROM contrato WHERE ContratoID = ?", id, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Eliminado Contrato con el ID: ", id);
    result(null, res);
  });
};

Contrato.removeAll = (result) => {
  sql.query("DELETE FROM contrato", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log(`Contratos Eliminados ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Contrato;
