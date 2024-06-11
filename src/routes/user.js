import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isEmployerOrAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES

// PRIVATE ROUTES
router.use(verifyToken);
// router.use(isAdmin);
// router.use(isEmployerOrAdmin);
router.get("/", controllers.getCurrent);

module.exports = router;
