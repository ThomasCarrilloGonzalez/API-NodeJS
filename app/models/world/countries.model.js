const sql = require("../db.js");

// constructor
const Country = function (country) {
  this.Code = country.Code;
  this.Name = country.Name;
  this.Continent = country.Continent;
  this.Region = country.Region;
  this.SurfaceAre = country.SurfaceAre;
  this.IndepYear = country.IndepYear;
  this.Population = country.Population;
  this.LifeExpectancy = country.LifeExpectancy;
  this.GNP = country.GNP;
  this.GNPOld = country.GNPOld;
  this.LocalName = country.LocalName;
  this.GovernmentForm = country.GovernmentForm;
  this.HeadOfState = country.HeadOfState;
  this.Capital = country.Capital;
  this.Code2 = country.Code2;
};

Country.create = (newCountry, result) => {
  sql.query("INSERT INTO country SET ?", newCountry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newCountry });
    result(null, { id: res.insertId, ...newCountry });
  });
};

Country.findById = (Code, result) => {
  sql.query(`SELECT * FROM country WHERE Code = ${Code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Country.getAll = (result) => {
  sql.query("SELECT * FROM country", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

Country.updateById = (code, country, result) => {
  sql.query(
    "UPDATE country SET Code = ?,Name = ?,Continent = ?,Region = ?,SurfaceArea = ?,IndepYear = ?,Population = ?,LifeExpectancy = ?,GNP = ?,GNPOld = ?,LocalName = ?,GovernmentForm = ?,HeadOfState = ?,Capital = ?,Code2 = ?WHERE Code = ?"[
      (country.Code,
      country.Name,
      country.Continent,
      countr.Region,
      country.SurfaceAre,
      country.IndepYear,
      country.Population,
      country.LifeExpectancy,
      country.GNP,
      country.GNPOld,
      country.LocalName,
      country.GovernmentForm,
      country.HeadOfState,
      country.Capital,
      country.Code2,
      code)
    ],
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

      console.log("updated user: ", { id: code, ...country });
      result(null, { id: code, ...country });
    }
  );
};

Country.remove = (code, result) => {
  sql.query("DELETE FROM country WHERE Code = ?", code, (err, res) => {
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

Country.removeAll = (result) => {
  sql.query("DELETE FROM country", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = Country;
