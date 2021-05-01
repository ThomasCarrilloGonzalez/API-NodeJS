const sql = require("./db.js");

// constructor
const Pais = function (pais) {
  this.PaisID = pais.PaisId;
  this.PaisNombre = pais.PaisNombre;
};

Pais.create = (newPais, result) => {
  sql.query("INSERT INTO pais SET ?", newPais, (err, res) => {
    if (err) {
      console.log("ERROR : ", err);
      result(err, null);
      return;
    }

    console.log("Pais Creado : ", {
      newPais,
    });
    result(null, { newPais });
  });
};

Pais.findById = (PaisID, result) => {
  sql.query(`SELECT * FROM pais WHERE PaisID = ${PaisID}`, (err, res) => {
    if (err) {
      console.log("ERROR : ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Pais Encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Pais.getAll = (result) => {
  sql.query("SELECT * FROM pais", (err, res) => {
    if (err) {
      console.log("ERROR : ", err);
      result(null, err);
      return;
    }

    console.log("Paises: ", res);
    result(null, res);
  });
};

Pais.updateById = (id, pais, result) => {
  sql.query(
    "UPDATE pais SET PaisID = ?, PaisNombre =? WHERE PaisID = ?",
    [pais.PaisID, pais.PasiNombre, id],
    (err, res) => {
      if (err) {
        console.log("ERROR : ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Pais Actualizado: ", { pais });
      result(null, { pais });
    }
  );
};

Pais.remove = (id, result) => {
  sql.query("DELETE FROM pais WHERE PaisID = ?", id, (err, res) => {
    if (err) {
      console.log("ERROR : ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Eliminado Pais con el ID: ", id);
    result(null, res);
  });
};

Pais.removeAll = (result) => {
  sql.query("DELETE FROM pais", (err, res) => {
    if (err) {
      console.log("ERROR : ", err);
      result(null, err);
      return;
    }

    console.log(`Paises Eliminados ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Pais;
