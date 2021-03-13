const express = require("express");
const router = express.Router();
const CommandControllers = require("../controllers/CommandControllers");

// Getting a user's commands the user id, or by an id and a tag which is a filter
// i.e SQL, Docker, Git, MongoDB.. etc

router.get("/:id", CommandControllers.getCommandByID);
router.get("/:id/:tag", CommandControllers.getCommandByTag);
router.post("/tags", CommandControllers.getUsersTags);
//CRUD operators on user commands

router.post("/", CommandControllers.postCommand);
router.put("/", CommandControllers.putCommand);
router.delete("/", CommandControllers.deleteCommand);

module.exports = router;
