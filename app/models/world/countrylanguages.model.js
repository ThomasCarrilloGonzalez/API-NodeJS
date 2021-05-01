const sql = require("./db.js");

// constructor
const Countrylanguage = function(countrylanguage) {
  this.CountryCode = countrylanguage.CountryCode;
  this.Language = countrylanguage.Language;
  this.IsOfficial = countrylanguage.IsOfficial;
  this.Percentage = countrylanguage.Percentage;
};

Countrylanguage.create = (newCountrylanguage, result) => {
  sql.query("INSERT INTO countrylanguage SET ?", newCountrylanguage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created countrylanguage: ", { id: res.insertId, ...newCountrylanguage });
    result(null, { id: res.insertId, ...newCountrylanguage});
  });
};

Countrylanguage.findById = (CountryCode, result) => {
  sql.query(`SELECT * FROM countrylanguage WHERE CountryCode = ${CountryCode}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Country language: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Countrylanguage.getAll = result => {
  sql.query("SELECT * FROM countrylanguage", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Country language: ", res);
    result(null, res);
  });
};

Countrylanguage.updateById = (CountryCode, language, countrylanguage, result) => {
  sql.query(
    "UPDATE countrylanguage SET CountryCode = ?, Language = ?, IsOfficial = ?, Percentage = ? WHERE CountryCode = ? AND Language = ?",
    [countrylanguage.CountryCode, countrylanguage.language, countrylanguage.IsOfficial, countrylanguage.Percentage, CountryCode, language],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...countrylanguage });
      result(null, { id: id, ...countrylanguage });
    }
  );
};

Countrylanguage.remove = (CountryCode, result) => {
  sql.query("DELETE FROM countrylanguage WHERE CountryCode = ?", CountryCode, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

Countrylanguage.removeAll = result => {
  sql.query("DELETE FROM countrylanguage", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Countrylanguage;
