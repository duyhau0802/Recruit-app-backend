import db from "../models";

export const getOne = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        // ko lay password
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "role_code",
            "refresh_token",
          ],
        },
        // lay role tu bang role (phai co khoa ngaoi)
        include: [
          {
            model: db.Role,
            as: "roleData",
            attributes: ["value"],
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Get one user successfully" : "User not found",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });
