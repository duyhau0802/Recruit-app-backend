const { notAuth } = require("./handle_errors");

export const isAdmin = (req, res, next) => {
  const { role_code } = req.user;
  console.log(role_code);
  if (role_code !== "R1") return notAuth("Required role admin", res);
  next();
};

export const isEmployerOrAdmin = (req, res, next) => {
  const { role_code } = req.user;
  if (role_code !== "R1" && req.user.role !== "R2")
    return notAuth("Required role employer or admin", res);
  next();
};
