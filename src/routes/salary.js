import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";
import { isAdmin } from "../middlewares/verify_roles";

const router = require("express").Router();

// PUBLIC ROUTES
router.get("/", controllers.getAllSalary);
router.get("/:id", controllers.getSalaryById);
// PRIVATE ROUTES
router.use(verifyToken);
router.use(isAdmin);
router.post("/", controllers.createSalary);
router.put("/:id", controllers.updateSalary);
router.delete("/:id", controllers.deleteSalary);

module.exports = router;
