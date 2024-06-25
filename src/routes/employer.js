import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createEmployer);
router.get("/", controllers.getAllEmployer);
router.get("/:id", controllers.getEmployerByUserId);
router.put("/:id", controllers.updateEmployer);

module.exports = router;
