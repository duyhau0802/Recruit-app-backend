import * as controllers from "../controllers";
import verifyToken from "../middlewares/verify_token";

const router = require("express").Router();

// PUBLIC ROUTES
// router.get("/", controllers.getAllSaved_job);
router.get("/:id", controllers.getSaved_jobById); // id_user
// PRIVATE ROUTES
// router.use(verifyToken);
router.post("/", controllers.createSaved_job);
// router.put("/:id", controllers.updateSaved_job);
router.delete("/:id", controllers.deleteSaved_job);

module.exports = router;
