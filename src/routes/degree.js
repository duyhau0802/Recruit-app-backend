import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createDegree);
router.get("/", controllers.getAllDegree);
router.get("/:id", controllers.getDegreeById);
router.put("/:id", controllers.updateDegree);
router.delete("/:id", controllers.deleteDegree);

module.exports = router;
