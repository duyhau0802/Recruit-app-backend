import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createJob_field);
router.get("/", controllers.getAllJob_field);
router.get("/:id", controllers.getJob_fieldById);
router.put("/:id", controllers.updateJob_field);
router.delete("/:id", controllers.deleteJob_field);

module.exports = router;
