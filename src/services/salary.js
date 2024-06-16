import db from "../models";

export const createSalary = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Salary.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Salary.findOne({
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
        const response = db.Salary.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllSalary = async () => {
  try {
    const response = await db.Salary.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getSalaryById = async (id) => {
  try {
    const response = await db.Salary.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateSalary = async (body) => {
  try {
    const response = await db.Salary.update(body, {
      where: { id: body.id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteSalary = async (body) => {
  try {
    const response = await db.Salary.destroy({
      where: { id: body.id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
