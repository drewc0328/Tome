const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db,
  connectionLimit: 10,
});

// Insert a user into tome_db, user table
exports.insertUser = (username, password, callback) => {
  const sql = `INSERT INTO user(username, password) VALUES('${username}', '${password}')`;
  GetConnection(sql, callback);
};

// Retrieve a user from tome_db, user table
exports.getUser = (username, callback) => {
  const sql = `SELECT * from user where username='${username}';`;
  GetConnection(sql, callback);
};

exports.postCommand = (uid, title, body, tag, callback) => {
  const sql = `INSERT INTO command(uid, title, body, tag) VALUES('${uid}', '${title}', '${body}', '${tag}')`;
  GetConnection(sql, callback);
};

exports.getCommandByID = (uid, callback) => {
  const sql = `SELECT id, title, body, tag FROM command WHERE uid=${uid.id}`;
  GetConnection(sql, callback);
};

exports.getCommandByTag = (id, tag, callback) => {
  const sql = `SELECT id, title, body, tag FROM command WHERE uid=${id} AND tag='${tag}'`;
  GetConnection(sql, callback);
};

exports.getUsersTags = (id, callback) => {
  const sql = `SELECT tag FROM command where uid=${id} group by tag`;
  GetConnection(sql, callback);
};

exports.putCommand = (id, title, body, tag, callback) => {
  const sql = `UPDATE command SET command.title='${title}', command.body='${body}', command.tag='${tag}' WHERE id=${id};`;
  GetConnection(sql, callback);
};

exports.deleteCommand = (id, callback) => {
  const sql = `DELETE FROM command WHERE id=${id}`;
  GetConnection(sql, callback);
};

const GetConnection = (sql, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }

    connection.query(sql, (err, results) => {
      if (err) {
        console.log(err);
        callback(true);
        return;
      }

      callback(false, results);
    });
  });
};
