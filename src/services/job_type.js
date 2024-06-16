import db from "../models";

export const createJob_type = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Job_type.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Job_type.findOne({
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
        const response = db.Job_type.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllJob_type = async () => {
  try {
    const response = await db.Job_type.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getJob_typeById = async (id) => {
  try {
    const response = await db.Job_type.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateJob_type = async (body, id) => {
  try {
    const response = await db.Job_type.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteJob_type = async (id) => {
  try {
    const response = await db.Job_type.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
