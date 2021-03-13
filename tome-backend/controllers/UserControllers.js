const UserSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");
const HttpError = require("../models/http-error");
const db = require("../database/database");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let value;
  try {
    value = await UserSchema.validateAsync({ username, password });
  } catch (err) {
    return next(new Error(err));
  }

  if (value) {
  } else {
    return next(new Error("Username or password is an invalid input"));
  }

  db.getUser(username, async (err, results) => {
    if (err) {
      return next(new HttpError("Server Error", 500));
    }

    let match = true;
    try {
      match = await bcrypt.compare(password, results[0].password);
    } catch (err) {
      const error = new HttpError("Invalid password, please try again", 401);
      return next(error);
    }

    if (!match) {
      const error = new HttpError("Invalid password, please try again", 401);
      return next(error);
    }

    res
      .status(201)
      .send({ user: { id: results[0].id, username: results[0].username } });
  });
};

const signup = async (req, res, next) => {
  const { username, password } = req.body;

  let value;
  try {
    value = await UserSchema.validateAsync({ username, password });
  } catch (err) {
    return next(new Error(err));
  }

  if (value) {
  } else {
    return next(new Error("Username or password is an invalid input"));
  }

  let bcryptHash = "";
  let saltRounds = 10;

  try {
    bcryptHash = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    const error = new HttpError("Error signing up the user", 422);
    return next(error);
  }

  db.insertUser(username, bcryptHash, function (err, results) {
    if (err) {
      return next(new HttpError("Server Error", 500));
    }

    res.status(201).send({ user: results });
  });
};

exports.login = login;
exports.signup = signup;
