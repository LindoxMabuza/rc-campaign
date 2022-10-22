const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const getApiController = require("../controllers/getApi");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comments Routes - simplified for now
// router.get("/:id", ensureAuth, commentsController.getComments);

router.get("/", apiController.getApis);
router.get("/auth", apiController.getAuthPage);
router.get("/api_auth_user", apiController.getAuthUserPage);
router.get("/:token/:call", apiController.getApi);
router.post("/auth/create_auth", apiController.postAuth);

module.exports = router;
