import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getAllProvince);
router.get("/:id", controllers.getProvinceById);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/", controllers.createProvince);
router.put("/:id", controllers.updateProvince);
router.delete("/:id", controllers.deleteProvince);

module.exports = router;
