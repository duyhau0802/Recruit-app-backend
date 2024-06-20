import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";
import uploadCloud from "../middlewares/uploadCloud";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getAllResumes);
router.get("/:id", controllers.getResumeByUserId);

// PRIVATE ROUTES
// router.use(verifyToken);
// router.use(isAdmin);
router.post("/", uploadCloud.single("cv_link"), controllers.createNewResume);
router.put("/", uploadCloud.single("cv_link"), controllers.updateResume);
router.delete("/", controllers.deleteResume);

module.exports = router;
