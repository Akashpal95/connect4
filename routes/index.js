const express = require("express");
const router = express.Router();
router.use(express.urlencoded());

const controller = require("../controllers");

router.get("/connect4", controller.processRequest);
module.exports = router;
