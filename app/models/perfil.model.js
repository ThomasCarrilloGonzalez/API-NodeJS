const sql = require("./db.js");

// constructor
const Perfil = function (perfil) {
  this.PerfilID = perfil.PerfilID;
  this.UsuarioID = perfil.UsuarioID;
  this.PerfilNombre = perfil.PerfilNombre;
  this.PerfilApellido = perfil.PerfilApellido;
  this.PerfilTelefono = perfil.PerfilTelefono;
  this.PerfilDireccion = perfil.PerfilDireccion;
  this.PaisID = perfil.PaisID;
};

Perfil.create = (newPerfil, result) => {
  sql.query("INSERT INTO perfil SET ?", newPerfil, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    console.log("Perfil Creado: ", { newPerfil });
    result(null, { newPerfil });
  });
};

Perfil.findById = (PerfilID, result) => {
  sql.query(`SELECT * FROM perfil WHERE PerfilID = ${PerfilID}`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Perfil Encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Perfil.getAll = (result) => {
  sql.query("SELECT * FROM perfil", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log("Perfiles : ", res);
    result(null, res);
  });
};

Perfil.updateById = (id, user, result) => {
  sql.query(
    "UPDATE perfil SET UsuarioID = ?, PerfilNombre = ?, PerfilApellido = ?, PerfilTelefono = ?, PerfilDireccion = ?, PaisID = ? WHERE PerfilID = ?",
    [
      perfil.UsuarioID,
      perfil.PerfilNombre,
      perfil.PerfilApellido,
      perfil.PerfilTelefono,
      perfil.PerfilDireccion,
      perfil.PaisID,
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

      console.log("Perfil Actualizado : ", { user });
      result(null, { user });
    }
  );
};

Perfil.remove = (id, result) => {
  sql.query("DELETE FROM perfil WHERE PerfilID = ?", id, (err, res) => {
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

    console.log("Eliminado Perfil con el ID: ", id);
    result(null, res);
  });
};

Perfil.removeAll = (result) => {
  sql.query("DELETE FROM perfil", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log(`Perfiles Borrados ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Perfil;
