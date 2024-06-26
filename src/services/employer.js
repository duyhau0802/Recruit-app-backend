import db from "../models";
const cloudinary = require("cloudinary").v2;

export const createEmployer = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Employer.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Employer.findOne({
      where: { value: body?.value },
    });
    try {
      if (existingCode) {
        resolve({
          err: 1,
          mes: "Code already exists!",
        });
      } else if (existingValue) {
        resolve({
          err: 1,
          mes: "Value already exists!",
        });
      } else {
        const response = db.Employer.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllEmployer = async () => {
  try {
    const response = await db.Employer.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getEmployerById = async (id) => {
  try {
    const response = await db.Employer.findOne({
      where: { id: id },
      attributes: {
        exclude: ["province_code", "job_fields_code", "user_id"],
      },
      include: [
        {
          model: db.User,
          as: "userData",
        },
        {
          model: db.Job_field,
          attributes: ["code", "value"],
          as: "jobFieldData",
        },
        {
          model: db.Province,
          attributes: ["code", "value"],
          as: "provinceData",
        },
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getEmployerByUserId = async (user_id) => {
  try {
    const response = await db.Employer.findOne({
      where: { user_id: user_id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateEmployer = async (body, id) => {
  try {
    const response = await db.Employer.update(body, {
      where: { user_id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateLogoCongTy = async (user_id, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      const employer = await db.Employer.findOne({
        where: { user_id: user_id },
      });
      const updateData = {};
      if (fileData) {
        const filename = employer.file_name;
        if (filename) {
          await cloudinary.uploader.destroy(filename);
        }
        updateData.logo_cong_ty = fileData?.path;
        updateData.file_name = fileData?.filename;
      }
      const response = await db.Employer.update(updateData, {
        where: { user_id: user_id },
      });
      resolve(response);
      if (fileData && response[0] === 0) {
        cloudinary.uploader.destroy(fileData?.filename);
      }
    } catch (error) {
      reject(error);
    }
  });
