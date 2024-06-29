import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isEmployerOrAdmin } from "../middlewares/verify_roles";
import uploadCloud from "../middlewares/uploadCloud";

const router = require("express").Router();

// LOGIN ROUTES
router.use(verifyToken);
router.get("/:id", controllers.getUserById);
router.put("/", uploadCloud.single("avatar"), controllers.updateAvatar);
router.put("/:id", controllers.updateUser);
// ADMIN ROUTES
// router.use(isAdmin);
router.get("/", controllers.getAllUser);
router.delete("/:id", controllers.deleteUser);

module.exports = router;
