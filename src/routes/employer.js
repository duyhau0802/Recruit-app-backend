import * as controllers from "../controllers";
import uploadCloud from "../middlewares/uploadCloud";

const router = require("express").Router();

// PUBLIC ROUTES
router.post("/", controllers.createEmployer);
router.get("/", controllers.getAllEmployer);
router.get("/:id", controllers.getEmployerByUserId);
router.put("/:id", controllers.updateEmployer);
router.put(
  "/update-logo-cong-ty/:id",
  uploadCloud.single("logo_cong_ty"),
  controllers.updateLogoCongTy
);

module.exports = router;
