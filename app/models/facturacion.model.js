const sql = require("./db.js");

// constructor
const Facturacion = function (facturacion) {
  this.FacturacionID = facturacion.FacturacionID;
  this.FacturacionUltimafecha = facturacion.FacturacionUltimafecha;
  this.FacturacionProximaFecha = facturacion.FacturacionProximaFecha;
  this.PerfilID = facturacion.PerfilID;
  this.MetodoPagoID = facturacion.MetodoPagoID;
  this.FacturacionDireccion = facturacion.FacturacionDireccion;
  this.PaisID = facturacion.PaisID;
  this.FacturacionEmail = facturacion.FacturacionEmail;
  this.FacturacionTransaccion = facturacion.FacturacionTransaccion;
  this.ContratoID = facturacion.ContratoID;
};

Facturacion.create = (newFacturacion, result) => {
  sql.query("INSERT INTO facturacion SET ?", newFacturacion, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    console.log("Facturacion Creada: ", {
      newFacturacion,
    });
    result(null, { newFacturacion });
  });
};

Facturacion.findById = (FacturacionID, result) => {
  sql.query(
    `SELECT * FROM facturacion WHERE FacturacionID = ${FacturacionID}`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Facturacion Encontrada : ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Facturacion.getAll = (result) => {
  sql.query("SELECT * FROM facturacion", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log("Facturaciones : ", res);
    result(null, res);
  });
};

Facturacion.updateById = (id, facturacion, result) => {
  sql.query(
    "UPDATE facturacion SET FacturacionID = ?, FacturacionUltimaFecha =?, FacturacionProximafecha =?, PerfilID =?, MetodoPagoID =?, FacturacionDireccion =?, PaisID =?, FacturacionEmail =?, FacturacionTransaccion =?, ContratoID =?  WHERE FacturacionID = ?",
    [
      facturacion.FacturacionID,
      facturacion.FacturacionUltimafecha,
      facturacion.FacturacionProximaFecha,
      facturacion.PerfilID,
      facturacion.MetodoPagoID,
      facturacion.FacturacionDireccion,
      facturacion.PaisID,
      facturacion.FacturacionEmail,
      facturacion.FacturacionTransaccion,
      facturacion.ContratoID,
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

      console.log("Facturacion Actualizada: ", { facturacion });
      result(null, { facturacion });
    }
  );
};

Facturacion.remove = (id, result) => {
  sql.query(
    "DELETE FROM facturacion WHERE FacturacionID = ?",
    id,
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

      console.log("Eliminada Facturacion con el ID: ", id);
      result(null, res);
    }
  );
};

Facturacion.removeAll = (result) => {
  sql.query("DELETE FROM facturacion", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log(`Facturaciones Eliminadas ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Facturacion;
