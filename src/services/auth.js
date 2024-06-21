import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail";

const hashPass = (password) => {
  return bcrypt.hashSync(password, 8);
};

// register Applicant
export const register = ({ username, email, password }) =>
  new Promise(async (resolve, reject) => {
    const existingUserByEmail = await db.User.findOne({
      where: { email: email },
    });
    const existingUserByUsername = await db.User.findOne({
      where: { username: username },
    });
    try {
      if (existingUserByEmail) {
        resolve({
          err: 1,
          mes: "Email already exists!",
        });
      } else if (existingUserByUsername) {
        resolve({
          err: 1,
          mes: "Username already exists!",
        });
      } else {
        const response = await db.User.findOrCreate({
          where: { email: email },
          defaults: {
            email: email,
            password: hashPass(password),
            username: username,
            role_code: "R3",
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
        const user_id = response[0].id;
        // Create an applicant
        await db.Applicant.create({
          user_id: user_id,
        });
        resolve({
          err: response[1] ? 0 : 1,
          mes: response[1] ? "Register successfully" : "Email already exists",
          username: response[0].username,
          userId: response[0].id,
          role_code: "R3",
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
      }
    } catch (error) {
      reject(error);
    }
  });

// register Employer
export const registerEmployer = ({
  username,
  email,
  password,
  ...employerData
}) =>
  new Promise(async (resolve, reject) => {
    const existingUserByEmail = await db.User.findOne({
      where: { email: email },
    });
    const existingUserByUsername = await db.User.findOne({
      where: { username: username },
    });
    try {
      if (existingUserByEmail) {
        resolve({
          err: 1,
          mes: "Email already exists!",
        });
      } else if (existingUserByUsername) {
        resolve({
          err: 1,
          mes: "Username already exists!",
        });
      } else {
        const response = await db.User.findOrCreate({
          where: { email: email },
          defaults: {
            email: email,
            password: hashPass(password),
            username: username,
            role_code: "R2",
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
        const user_id = response[0].id;
        // Create an employer
        const responseEmployer = await db.Employer.create({
          ...employerData,
          user_id: user_id,
        });
        resolve({
          err: response[1] ? 0 : 1,
          mes: response[1] ? "Register successfully" : "Email already exists",
          username: response[0].username,
          user_id: response[0].id,
          employer: responseEmployer,
          role_code: "R2",
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
      }
    } catch (error) {
      reject(error);
    }
  });

export const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({ where: { email } });
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
        username: response.username,
        userId: response.id,
        role_code: response.role_code,
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

export const resetPassword = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        resolve({
          err: 1,
          mes: "Email is not registered",
        });
      }
      let token = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10m",
      });
      const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
      resolve({
        err: 0,
        mes: "password reset link sent to your email account",
      });
      await sendEmail(user.email, "Reset Password", link);
    } catch (error) {
      reject(error);
    }
  });

export const resetUserPassword = async (password, token) =>
  new Promise(async (resolve, reject) => {
    try {
      // Verify the token with error handling
      const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const userId = decoded?.id;

      // Check for missing user ID in decoded token
      if (!userId) {
        return resolve({ err: 1, mes: "Invalid token (missing user ID)" });
      }

      // Fetch the user by ID
      const user = await db.User.findOne({ where: { id: userId } });
      if (!user) {
        return resolve({ err: 1, mes: "Invalid user" });
      }

      await db.User.update(
        { password: hashPass(password) },
        { where: { id: userId } }
      );

      resolve({ err: 0, mes: "Password reset successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
      reject(error); // Re-throw the error for handling in the calling context
    }
  });
