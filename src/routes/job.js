import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isEmployerOrAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
// vi crud dung 4 method khac nhau nen ko can chi dg dan
router.get("/", controllers.getJobs);

// PRIVATE ROUTES
router.use(verifyToken);
// router.use(isAdmin);
router.use(isEmployerOrAdmin);
router.post("/", controllers.createNewJob);

module.exports = router;
