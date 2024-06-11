import jwt from "jsonwebtoken";
import { notAuth } from "./handle_errors.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notAuth("Required token, authorization, login", res);
  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKKEN_SECRET, (err, user) => {
    if (err) return notAuth("Invalid token", res);
    req.user = user;
    next();
  });
};

export default verifyToken;
