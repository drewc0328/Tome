const CommandSchema = require("../models/CommandModel");
const UserSchema = require("../models/UserModel");
const HttpError = require("../models/http-error");
const db = require("../database/database");

const getCommandByID = async (req, res, next) => {
  const uid = req.params;

  db.getCommandByID(uid, (err, results) => {
    if (err) {
      return next(new HttpError("Error getting the commands by User ID", 500));
    }

    console.log(results);

    res.status(201).send({ result: results });
  });
};

const getCommandByTag = async (req, res, next) => {
  const { id, tag } = req.params;

  db.getCommandByTag(id, tag, (err, results) => {
    if (err) {
      return next(new HttpError("Error getting the command by Tag ID", 500));
    }

    console.log(results);

    res.status(201).send({ result: results });
  });
};

const getUsersTags = async (req, res, next) => {
  const { id } = req.body;

  db.getUsersTags(id, (err, results) => {
    if (err) {
      return next(new HttpError("Error getting the user's tags!", 500));
    }

    res.status(201).send({ tags: results });
  });
};

const postCommand = async (req, res, next) => {
  const { uid, title, body, tag } = req.body;

  let value;
  try {
    value = await CommandSchema.validateAsync({ uid, title, body, tag });
  } catch (err) {
    return next(new HttpError("Inputs are not valid!", 500));
  }

  if (value) {
  } else {
    return next(new HttpError("Inputs are not valid!", 500));
  }

  db.postCommand(uid, title, body, tag, (err, results) => {
    if (err) {
      return next(new HttpError("Error posting the command", 500));
    }

    console.log(results);

    res
      .status(201)
      .send({ message: "Command successfully inserted into table" });
  });
};

const searchCommand = async (req, res, next) => {
  const { uid, search } = req.body;

  db.searchCommand(uid, search, (err, results) => {
    if (err) {
      return next(new HttpError("Error searching for the command", 500));
    }

    console.log(results);

    res.status(201).send({ commands: results });
  });
};

const putCommand = async (req, res, next) => {
  const { id, title, body, tag } = req.body;

  db.putCommand(id, title, body, tag, (err, results) => {
    if (err) {
      return next(new HttpError("Error updating the command", 500));
    }

    console.log(results);

    res.status(201).send({ message: "Command was successfully updated" });
  });
};

const deleteCommand = async (req, res, next) => {
  const { id } = req.body;

  db.deleteCommand(id, (err, results) => {
    if (err) {
      return next(new HttpError("Error deleting the command", 500));
    }

    console.log(results);

    res.status(201).send({ message: "Command was successfully deleted" });
  });
};

exports.getCommandByID = getCommandByID;
exports.getCommandByTag = getCommandByTag;
exports.getUsersTags = getUsersTags;
exports.postCommand = postCommand;
exports.searchCommand = searchCommand;
exports.putCommand = putCommand;
exports.deleteCommand = deleteCommand;
