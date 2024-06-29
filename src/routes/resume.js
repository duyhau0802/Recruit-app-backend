import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isApplicant } from "../middlewares/verify_roles";
import uploadCloud from "../middlewares/uploadCloud";

const router = require("express").Router();

// AFTER LOGIN ROUTES
router.get("/", controllers.getAllResumes);
router.get("/:id", controllers.getResumeByUserId);

// APPLICANT ROUTES
router.use(verifyToken);
router.use(isApplicant);
router.post("/", uploadCloud.single("cv_link"), controllers.createNewResume);
router.put("/", uploadCloud.single("cv_link"), controllers.updateResume);
router.delete("/", controllers.deleteResume);

module.exports = router;
