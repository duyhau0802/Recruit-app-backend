import db from "../models";

export const createProvince = (body) =>
  new Promise(async (resolve, reject) => {
    const existingCode = await db.Province.findOne({
      where: { code: body?.code },
    });
    const existingValue = await db.Province.findOne({
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
        const response = db.Province.create(body);
        resolve({
          err: response ? 0 : 1,
          mes: response ? "Created" : "Err",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllProvince = async () => {
  try {
    const response = await db.Province.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getProvinceById = async (id) => {
  try {
    const response = await db.Province.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateProvince = async (body, id) => {
  try {
    const response = await db.Province.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProvince = async (id) => {
  try {
    const response = await db.Province.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
