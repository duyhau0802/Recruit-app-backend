import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isEmployer } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getJobs);
router.get("/list", controllers.getJobByUserId);
router.get("/:id", controllers.getJobById);
router.get("/getbyemployerid/:id", controllers.getJobByEmployerId);
router.put("/:id", controllers.updateJob);
router.delete("/:id", controllers.deleteJob);
router.post("/:id", controllers.createNewJob);

// PRIVATE ROUTES
// router.use(verifyToken);
// router.use(isEmployer);

module.exports = router;
