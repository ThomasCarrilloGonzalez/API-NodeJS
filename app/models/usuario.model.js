const sql = require("./db.js");

// constructor
const Usuario = function (usuario) {
  this.UsuarioID = usuario.UsuarioID;
  this.UsuarioEmail = usuario.UsuarioEmail;
  this.UsuarioPassword = usuario.UsuarioPassword;
};

Usuario.create = (newUser, result) => {
  sql.query("INSERT INTO usuario SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Nuevo Usuario : ", { newUser });
    result(null, { newUser });
  });
};

Usuario.findById = (UsuarioID, result) => {
  sql.query(
    `SELECT * FROM usuario WHERE UsuarioID = '${UsuarioID}'`,
    (err, res) => {
      if (err) {
        console.log("ERROR: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Usuario Encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Usuario.getAll = (result) => {
  sql.query("SELECT * FROM usuario", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log("Usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuario SET UsuarioID =?, UsuarioEmail = ?, UsuarioPassword = ? WHERE UsuarioID = ?",
    [usuario.UsuarioID, usuario.UsuarioEmail, usuario.UsuarioPassword, id],
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

      console.log("Usuario Actualizado: ", { usuario });
      result(null, { usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE UsuarioID = ?", id, (err, res) => {
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

    console.log("Eliminado Usuario con el ID : ", id);
    result(null, res);
  });
};

Usuario.removeAll = (result) => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log(`Usuarios Borrados ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Usuario;
