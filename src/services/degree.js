import db from "../models";

export const createDegree = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Degree.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Degree.findOne({
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
        const response = db.Degree.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllDegree = async () => {
  try {
    const response = await db.Degree.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getDegreeById = async (id) => {
  try {
    const response = await db.Degree.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateDegree = async (body, id) => {
  try {
    const response = await db.Degree.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteDegree = async (id) => {
  try {
    const response = await db.Degree.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
