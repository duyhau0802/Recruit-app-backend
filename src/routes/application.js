import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isEmployer, isApplicant } from "../middlewares/verify_roles";
const router = require("express").Router();

// AFTER LOGIN ROUTES
// router.use(verifyToken);

router.post("/", controllers.createApplication);
router.get("/", controllers.getAllApplication);
router.get("/:id", controllers.getApplicationByApplicantId);
router.get("/employer/:id", controllers.getApplicationByEmployerId);
router.put("/:id", controllers.updateApplication);
router.delete("/:id", controllers.deleteApplication);

// EMPLOYER ROUTES

module.exports = router;
