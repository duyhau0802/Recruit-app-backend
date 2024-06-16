import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createJob_type);
router.get("/", controllers.getAllJob_type);
router.get("/:id", controllers.getJob_typeById);
router.put("/:id", controllers.updateJob_type);
router.delete("/:id", controllers.deleteJob_type);

module.exports = router;
