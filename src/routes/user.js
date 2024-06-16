import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isEmployerOrAdmin } from "../middlewares/verify_roles";
// import uploadCloud from "../middlewares/uploadCloud";

const router = require("express").Router();

// PUBLIC ROUTES
// router.post("/", uploadCloud.single("avatar"), controllers.createNewUser);

// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
// router.use(isEmployerOrAdmin);
router.get("/", controllers.getCurrent);

module.exports = router;
