import * as controllers from "../controllers";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createProvince);
router.get("/", controllers.getAllProvince);
router.get("/:id", controllers.getProvinceById);
router.put("/:id", controllers.updateProvince);
router.delete("/:id", controllers.deleteProvince);

module.exports = router;
