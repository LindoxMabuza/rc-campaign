const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const getApiController = require("../controllers/getApi");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now
// router.get("/:id", ensureAuth, commentsController.getComments);

router.get("/:call", getApiController.getIndex);

module.exports = router;
