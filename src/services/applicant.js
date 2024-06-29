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

export const getApplicantById = async (id) => {
  try {
    const response = await db.Applicant.findOne({
      where: { id: id },
      attributes: {
        exclude: ["province_code", "user_id", "bang_cap_code"],
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
        {
          model: db.Degree,
          attributes: ["code", "value"],
          as: "degreeData",
        },
        {
          model: db.Job_field,
          attributes: ["code", "value"],
          as: "jobFieldData",
        },
        {
          model: db.Job_type,
          attributes: ["code", "value"],
          as: "jobTypeData",
        },
        {
          model: db.Salary,
          attributes: ["code", "value"],
          as: "salaryData",
        },
        {
          model: db.Province,
          attributes: ["code", "value"],
          as: "currentProvinceData",
        },
        {
          model: db.Province,
          attributes: ["code", "value"],
          as: "desiredProvinceData",
        },
      ],
    });
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

export const updateApplicant = async (body, user_id) => {
  try {
    const response = await db.Applicant.update(body, {
      where: { user_id: user_id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
