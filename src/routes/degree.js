import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getAllDegree);
router.get("/:id", controllers.getDegreeById);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/", controllers.createDegree);
router.put("/:id", controllers.updateDegree);
router.delete("/:id", controllers.deleteDegree);

module.exports = router;
