import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isEmployerOrAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
// vi crud dung 4 method khac nhau nen ko can chi dg dan
router.get("/", controllers.getJobs);
router.get("/list/:user_id", controllers.getJobByUserId);
router.get("/:id", controllers.getJobById);
router.post("/", controllers.createNewJob);
router.put("/:id", controllers.updateJob);
router.delete("/:id", controllers.deleteJob);

// PRIVATE ROUTES
router.use(verifyToken);
// router.use(isAdmin);
router.use(isEmployerOrAdmin);

module.exports = router;
