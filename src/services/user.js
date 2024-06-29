import db from "../models";
const cloudinary = require("cloudinary").v2;

export const getAllUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        attributes: { exclude: ["password", "refresh_token"] },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getUserById = async (id) => {
  try {
    const response = await db.User.findByPk(id, {
      attributes: { exclude: ["password", "refresh_token"] },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// export const getApplicantById = async (id) => {
//   try {
//     const response = await db.Applicant.findOne({
//       where: { user_id: id },
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const updateAvatar = async (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      // Find the existing resume record using findByPk
      const user_id = body.user_id;
      const user = await db.User.findOne({ where: { id: user_id } });
      if (fileData) {
        const filename = user.file_name;
        if (filename) {
          await cloudinary.uploader.destroy(filename);
        }
        body.avatar = fileData?.path;
        body.file_name = fileData?.filename;
      }
      const response = await db.User.update(body, { where: { id: user_id } });
      resolve(response);
      if (fileData && response[0] === 0) {
        cloudinary.uploader.destroy(fileData?.filename);
      }
    } catch (error) {
      // xoa tren server neu case co loi
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData?.filename);
    }
  });

export const updateUser = async (body, id) => {
  try {
    const response = await db.User.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: id } });
      if (user.file_name) await cloudinary.uploader.destroy(user.file_name);
      const user_role = user.role_code;
      if (user_role === "R3")
        await db.Applicant.destroy({ where: { user_id: id } });
      if (user_role === "R2") {
        const employer = await db.Employer.findOne({ where: { user_id: id } });
        if (employer) {
          if (employer.file_name)
            await cloudinary.uploader.destroy(employer.file_name);
          await db.Employer.destroy({ where: { user_id: id } });
        }
      }
      const response = await db.User.destroy({
        where: { id: id },
      });
      resolve({
        err: response > 0 ? 0 : 1,
        mes:
          response > 0
            ? `${response} user deleted`
            : "Can not delete / Resume id it not found",
      });
    } catch (error) {
      reject(error);
    }
  });
