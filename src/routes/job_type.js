import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getAllJob_type);
router.get("/:id", controllers.getJob_typeById);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/", controllers.createJob_type);
router.put("/:id", controllers.updateJob_type);
router.delete("/:id", controllers.deleteJob_type);

module.exports = router;
