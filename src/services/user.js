import db from "../models";

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

export const getApplicantById = async (id) => {
  try {
    const response = await db.Applicant.findOne({
      where: { user_id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, body) => {
  try {
    const { avatar, username, ...applicantData } = body;

    const [affectedRowsUser, affectedRowsApplicant] = await Promise.all([
      db.User.update({ username }, { where: { id } }),
      db.Applicant.update(applicantData, { where: { user_id: id } }),
    ]);

    return { affectedRowsUser, affectedRowsApplicant };
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await db.User.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
