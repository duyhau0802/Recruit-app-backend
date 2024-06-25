import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin, isEmployerOrAdmin } from "../middlewares/verify_roles";
import uploadCloud from "../middlewares/uploadCloud";

const router = require("express").Router();

// PUBLIC ROUTES
// router.post("/", uploadCloud.single("avatar"), controllers.createNewUser);

router.get("/", controllers.getAllUser);
router.get("/:id", controllers.getUserById);
router.put("/", uploadCloud.single("avatar"), controllers.updateAvatar);
router.put("/:id", controllers.updateUser);
router.delete("/:id", controllers.deleteUser);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
// router.use(isEmployerOrAdmin);

module.exports = router;
