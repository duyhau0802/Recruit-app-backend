import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createApplication);
router.get("/", controllers.getAllApplication);
router.get("/:id", controllers.getApplicationByApplicantId);
router.get("/employer/:id", controllers.getApplicationByEmployerId);

router.put("/:id", controllers.updateApplication);
router.delete("/:id", controllers.deleteApplication);

module.exports = router;
