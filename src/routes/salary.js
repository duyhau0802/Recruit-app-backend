import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createSalary);
router.get("/", controllers.getAllSalary);
router.get("/:id", controllers.getSalaryById);
router.put("/:id", controllers.updateSalary);
router.delete("/:id", controllers.deleteSalary);

module.exports = router;
