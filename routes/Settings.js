const express = require("express");

const router = express.Router();


const { CreateClient,CreateTokens } = require("../controllers/SystemTokens");



// // protect middleware
// const { protect, authorisRole,authToken } = require("../middleware/guard");

//routes

//path settings
router.route("/token/create").post(CreateClient);
router.route("/token/create/apikey").post(CreateTokens);


module.exports = router;
