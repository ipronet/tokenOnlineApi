const pool = require("../config/db");

let sesa = {};

sesa.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM client_access WHERE deletedAt IS NULL AND status = 1", (err, results) => {
      if (err) {
        return reject(err);
      }

      return resolve(results);
    });
  });
};

sesa.create = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO client_access SET ?",
      [postData],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      }
    );
  });
};

sesa.createToken = (postData = req.body) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO client_token SET ?",
      [postData],
      (err, results) => {
        if (err) {
          return reject(err);
        }

        return resolve(results);
      }
    );
  });
};

sesa.update = (postdata, idprofile) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE client_access SET ? WHERE id = ?",
      [postdata, idprofile],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

sesa.Find = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM client_access WHERE deletedAt IS NULL AND status = 1 AND email = ?";
    pool.query(sql, [email], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

sesa.Find = (table,searchTerm,value) => {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT * FROM ?? WHERE ?? = ?";
    pool.query(sql, [table,searchTerm,value], function (error, results, fields) {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};
module.exports = sesa;
