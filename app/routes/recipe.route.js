var express = require("express");
const router = express.Router();
expressValidator = require("express-validator");
var recipeController = require("../controller/recipe.controller");
router.use(expressValidator());
router.post("/", recipeController.create);

module.exports = router;