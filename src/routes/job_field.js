import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getAllJob_field);
router.get("/:id", controllers.getJob_fieldById);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/", controllers.createJob_field);
router.put("/:id", controllers.updateJob_field);
router.delete("/:id", controllers.deleteJob_field);

module.exports = router;
