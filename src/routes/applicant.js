import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/:id", controllers.createApplicant);
router.get("/", controllers.getAllApplicant);
router.get("/:id", controllers.getApplicantByUserId);
router.get("/getbyid/:id", controllers.getApplicantById);
router.put("/:id", controllers.updateApplicant);

module.exports = router;
