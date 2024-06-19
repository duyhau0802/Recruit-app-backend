import db from "../models";

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
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteEmployer = async (id) => {
  try {
    const response = await db.Employer.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
