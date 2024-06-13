import user from "./user";
import auth from "./auth";
import job from "./job";
import degree from "./degree";
import resume from "./resume";
import { notFound } from "../middlewares/handle_errors";

const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/job", job);
  app.use("/api/v1/degree", degree);
  app.use("/api/v1/resume", resume);

  app.use(notFound);
};

module.exports = initRoutes;
