import jwt, { TokenExpiredError } from "jsonwebtoken";
import { notAuth } from "./handle_errors.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token)
    return notAuth("Required authorization, login & get ur token", res);
  const accessToken = token.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decodedUser) => {
    if (err) {
      const isChecked = err instanceof TokenExpiredError;
      if (!isChecked) return notAuth("Access token is Invalid", res, isChecked);
      if (isChecked) return notAuth("Access token is Expired", res, isChecked);
    }
    req.user = decodedUser;
    next();
  });
};

export default verifyToken;
