const sql = require("../db.js");

// constructor
const City = function (city) {
  this.ID = city.ID;
  this.Name = city.Name;
  this.CountryCode = city.CountryCode;
  this.District = city.District;
  this.Population = city.Population;
};

City.create = (newCity, result) => {
  sql.query("INSERT INTO city SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newCity });
    result(null, { id: res.insertId, ...newCity });
  });
};

City.findById = (ID, result) => {
  sql.query(`SELECT * FROM city WHERE ID = ${ID}`, (err, res) => {
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

City.getAll = (result) => {
  sql.query("SELECT * FROM city", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

City.updateById = (ID, city, result) => {
  sql.query(
    "UPDATE city SET Name = ?, CountryCode = ?, District = ?, Population = ?, WHERE ID = ?",
    [city.Name, city.Countrycode, city.District, city.Population, ID],
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

      console.log("updated city: ", { id: id, ...city });
      result(null, { id: id, ...city });
    }
  );
};

City.remove = (id, result) => {
  sql.query("DELETE FROM city WHERE ID = ?", id, (err, res) => {
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

    console.log("deleted city with id: ", id);
    result(null, res);
  });
};

City.removeAll = (result) => {
  sql.query("DELETE FROM city", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cities`);
    result(null, res);
  });
};

module.exports = City;
