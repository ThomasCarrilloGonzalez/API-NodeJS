const sql = require("./db.js");

// constructor
const Login = function (login) {
  this.LoginID = login.LoginID;
  this.UsuarioID = login.UsuarioID;
  this.LoginUbicacionLat = login.LoginUbicacionLat;
  this.LoginUbicacionLon = login.LoginUbicacionLat;
  this.LoginUbicacionAprox = login.LoginUbicacionAprox;
  this.LoginIP = login.LoginIP;
  this.LoginFechaConexion = login.LoginFechaConexion;
  this.LoginFechaDesconexion = login.LoginFechaDesconexion;
};

Login.create = (newLogin, result) => {
  sql.query("INSERT INTO login SET ?", newLogin, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    console.log("Login Creado: ", {
      newLogin,
    });
    result(null, { newLogin });
  });
};

Login.findById = (LoginID, result) => {
  sql.query(`SELECT * FROM login WHERE LoginID = ${LoginID}`, (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Login Encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Login.getAll = (result) => {
  sql.query("SELECT * FROM login", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Login.updateById = (id, login, result) => {
  sql.query(
    "UPDATE login SET LoginID = ?, UsuarioID = ?, LoginUbicacionLat =?, LoginUbicacionLon =?, LoginUbicacionAprox =?, LoginIP =?, LoginFechaConexion =?, LoginFechaDesconexion =?  WHERE LoginID = ?",
    [
      login.LoginID,
      login.UsuarioID,
      login.LoginUbicacionLat,
      login.LoginUbicacionLon,
      login.LoginUbicacionAprox,
      login.LoginIP,
      login.LoginFechaConexion,
      login.LoginFechaDesconexion,
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

      console.log("Login Actualizado: ", { login });
      result(null, { login });
    }
  );
};

Login.remove = (id, result) => {
  sql.query("DELETE FROM login WHERE LoginID = ?", id, (err, res) => {
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

    console.log("Eliminado Login con el ID: ", id);
    result(null, res);
  });
};

Login.removeAll = (result) => {
  sql.query("DELETE FROM login", (err, res) => {
    if (err) {
      console.log("ERROR: ", err);
      result(null, err);
      return;
    }

    console.log(`Login Eliminados ${res.affectedRows} `);
    result(null, res);
  });
};

module.exports = Login;
