import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.use("/", controllers.getAllDegree);

module.exports = router;
