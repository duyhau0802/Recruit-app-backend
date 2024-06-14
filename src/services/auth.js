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
      const accessToken = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
              email: response[0].email,
              role_code: response[0].role_code,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "600s" }
          )
        : null;

      const refreshToken = response[1]
        ? jwt.sign(
            {
              id: response[0].id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10d" }
          )
        : null;

      resolve({
        err: response[1] ? 0 : 1,
        mes: response[1] ? "Register successfully" : "Email already exists",
        access_token: accessToken ? `Bearer ${accessToken}` : null,
        refresh_token: refreshToken ? `${refreshToken}` : null,
      });
      if (refreshToken) {
        await db.User.update(
          { refresh_token: refreshToken },
          {
            where: { id: response[0].id },
          }
        );
      }
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
      const accessToken = isChecked
        ? jwt.sign(
            {
              id: response.id,
              email: response.email,
              role_code: response.role_code,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "600s" }
          )
        : null;
      const refreshToken = isChecked
        ? jwt.sign(
            {
              id: response.id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "10d" }
          )
        : null;
      resolve({
        err: accessToken ? 0 : 1,
        mes: accessToken
          ? "Login successfully"
          : response
          ? "Password is wrong"
          : "Email is not registered",
        access_token: accessToken ? `Bearer ${accessToken}` : null,
        refresh_token: refreshToken ? `${refreshToken}` : null,
      });

      resolve({
        err: 0,
        mes: "login service",
      });
      if (refreshToken) {
        await db.User.update(
          { refresh_token: refreshToken },
          {
            where: { id: response.id },
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });

export const refreshToken = (refresh_token) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(refresh_token);
      const response = await db.User.findOne({
        where: { refresh_token },
        // raw: true,
      });
      if (response) {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err) => {
          if (err) {
            resolve({
              err: 1,
              mes: "refresh token expried, required login again",
            });
          } else {
            const accessToken = jwt.sign(
              {
                id: response.id,
                email: response.email,
                role_code: response.role_code,
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "600s" }
            );
            resolve({
              err: accessToken ? 0 : 1,
              mes: accessToken
                ? "OK new accessToken sent"
                : "Fail to get new accessToken",
              access_token: `Bearer ${accessToken}`,
              refresh_token: refresh_token,
            });
          }
        });
      } else {
        resolve({
          err: 1,
          mes: "refresh token is invalid, required login again",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
