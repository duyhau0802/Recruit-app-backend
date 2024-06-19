import db from "../models";

export const createApplicant = (user_id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = db.Applicant.create({
        ...body,
        user_id: user_id,
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Created" : "Err",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllApplicant = async () => {
  try {
    const response = await db.Applicant.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getApplicantByUserId = async (user_id) => {
  try {
    const response = await db.Applicant.findOne({
      where: { user_id: user_id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateApplicant = async (body, id) => {
  try {
    const response = await db.Applicant.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteApplicant = async (id) => {
  try {
    const response = await db.Applicant.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
