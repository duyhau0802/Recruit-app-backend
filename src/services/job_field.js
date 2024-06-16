import db from "../models";

export const createJob_field = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Job_field.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Job_field.findOne({
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
        const response = db.Job_field.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllJob_field = async () => {
  try {
    const response = await db.Job_field.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getJob_fieldById = async (id) => {
  try {
    const response = await db.Job_field.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateJob_field = async (body, id) => {
  try {
    const response = await db.Job_field.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteJob_field = async (id) => {
  try {
    const response = await db.Job_field.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
