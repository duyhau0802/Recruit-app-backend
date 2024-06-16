import user from "./user";
import auth from "./auth";
import job from "./job";
import degree from "./degree";
import resume from "./resume";
import job_field from "./job_field";
import job_type from "./job_type";
import salary from "./salary";
import province from "./province";
import { notFound } from "../middlewares/handle_errors";

const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/job", job);
  app.use("/api/v1/resume", resume);

  app.use("/api/degree", degree);
  app.use("/api/job-field", job_field);
  app.use("/api/job-type", job_type);
  app.use("/api/province", province);
  app.use("/api/salary", salary);

  app.use(notFound);
};
module.exports = initRoutes;
