import user from "./user";
import auth from "./auth";
import job from "./job";
import degree from "./degree";
import resume from "./resume";
import job_field from "./job_field";
import job_type from "./job_type";
import salary from "./salary";
import province from "./province";
import applicant from "./applicant";
import application from "./application";
import employer from "./employer";
import saved_job from "./saved-job";
import { notFound } from "../middlewares/handle_errors";

const initRoutes = (app) => {
  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/job", job);
  app.use("/api/resume", resume);

  app.use("/api/degree", degree);
  app.use("/api/job-field", job_field);
  app.use("/api/job-type", job_type);
  app.use("/api/province", province);
  app.use("/api/salary", salary);
  app.use("/api/applicant", applicant);
  app.use("/api/employer", employer);
  app.use("/api/application", application);
  app.use("/api/saved-job", saved_job);

  app.use(notFound);
};
module.exports = initRoutes;
