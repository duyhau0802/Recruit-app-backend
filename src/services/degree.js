import db from "../models";

// export const getAllDegree = () =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const response = await db.Degree.findAll();
//       resolve({
//         err: response ? 0 : 1,
//         mes: response ? "Got" : "Can not found degree",
//         degreeData: response,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

export const getAllDegree = async () => {
  try {
    const response = await db.Degree.findAll();
    return response;
  } catch (error) {
    return error;
  }
};
