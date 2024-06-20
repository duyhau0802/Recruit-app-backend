import db from "../models";

export const createApplication = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Application.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Application.findOne({
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
        const response = db.Application.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllApplication = async () => {
  try {
    console.log("get all application service");
    const response = await db.Application.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const response = await db.Application.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateApplication = async (body, id) => {
  try {
    const response = await db.Application.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await db.Application.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
