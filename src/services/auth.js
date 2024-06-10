import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPass = (password) => {
  return bcrypt.hashSync(password, 8);
};

export const register = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { email: email },
        defaults: {
          email: email,
          password: hashPass(password),
        },
      });
      const token = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.ACCESS_TOKKEN_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register successfully" : "Email already exists",
        access_token: token ? `Bearer ${token}` : null,
      });

      resolve({
        err: 0,
        mes: "register service",
      });
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      const isChecked =
        response && bcrypt.compareSync(password, response.password);
      const token = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.ACCESS_TOKKEN_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        err: token ? 0 : 1,
        mes: token
          ? "Login successfully"
          : response
          ? "Password is wrong"
          : "Email is not registered",
        access_token: token ? `Bearer ${token}` : null,
      });

      resolve({
        err: 0,
        mes: "login service",
      });
    } catch (error) {
      reject(error);
    }
  });
