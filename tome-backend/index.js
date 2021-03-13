const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const UserRoutes = require("./routes/UserRoutes");
const HttpError = require("./models/http-error");
const CommandRoutes = require("./routes/CommandRoutes");

dotenv.config();
const port = process.env.PORT;

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.db,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

try {
  connection.connect((err) => {
    if (err) {
      return next(HttpError("Error connecting to database", 500));
    }
    console.log("Database connected");
    connection.query(`USE ${process.env.db}`, function (error, results) {
      if (error) throw error;
      console.log(`USING ${process.env.db}`);
    });
  });
  app.listen(port, () => {
    console.log(`Server is connected on port ${port}`);
  });
} catch (err) {
  console.log("ERR: ", err);
}

app.use("/api/users", UserRoutes);
app.use("/api/commands", CommandRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Couldn't find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
