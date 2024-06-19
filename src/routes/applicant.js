import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/:id", controllers.createApplicant);
router.get("/", controllers.getAllApplicant);
router.get("/:id", controllers.getApplicantByUserId);
router.put("/:id", controllers.updateApplicant);
router.delete("/:id", controllers.deleteApplicant);

module.exports = router;
