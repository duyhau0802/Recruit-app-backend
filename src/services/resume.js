import db from "../models";
const cloudinary = require("cloudinary").v2;

// READ
export const getAllResumes = ({ page, limit, order, name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Resume.findAndCountAll({});
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got data" : "Can not found Resume",
        ResumeData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

// READ
export const getResumeByUserId = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Resume.findAll({
        where: { id_user: userId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
// CREATE
export const createNewResume = (body, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      // lay file anh tu form-data gui len
      const response = await db.Resume.findOrCreate({
        where: { cv_link: fileData?.path },
        // neu trung cv_link thi xoa tren server
        defaults: {
          ...body,
          cv_link: fileData?.path,
          file_name: fileData?.filename,
        },
      });
      resolve({
        // true neu ko tim thay va tao newResume
        err: response[1] ? 0 : 1,
        mes: response[1]
          ? "Created"
          : "Can not create Resume because have the same cv_link",
      });
      if (fileData && !response[1]) {
        cloudinary.uploader.destroy(fileData?.filename);
      }
    } catch (error) {
      // xoa tren server neu case co loi
      cloudinary.uploader.destroy(fileData?.filename);
      reject(error);
    }
  });
// UPDATE
export const updateResume = ({ id, ...body }, fileData) =>
  new Promise(async (resolve, reject) => {
    try {
      // Find the existing resume record using findByPk
      const row = await db.Resume.findByPk(id);
      const response1 = await cloudinary.uploader.destroy(row.file_name);
      console.log(response1);
      if (fileData) {
        body.cv_link = fileData?.path;
        body.file_name = fileData?.filename;
      }
      const response = await db.Resume.update(body, { where: { id: id } });
      resolve({
        // response tra ve 1 mang chua so luong row updated
        err: response[0] > 0 ? 0 : 1,
        mes:
          response[0] > 0
            ? `${response[0]} resume updated`
            : "Can not update Resume / id not found",
      });
      if (fileData && response[0] === 0) {
        cloudinary.uploader.destroy(fileData?.filename);
      }
    } catch (error) {
      // xoa tren server neu case co loi
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData?.filename);
    }
  });

// DELETE
export const deleteResume = (ids, file_name) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Resume.destroy({ where: { id: ids } });
      resolve({
        // response tra ve 1 so row da xoa duoc
        err: response > 0 ? 0 : 1,
        mes:
          response > 0
            ? `${response} resume deleted`
            : "Can not delete / Resume id it not found",
      });
      if (file_name) cloudinary.api.delete_resources(file_name);
    } catch (error) {
      // xoa tren server neu case co loi
      reject(error);
      // if (fileData) cloudinary.uploader.destroy(fileData?.filename);
    }
  });

// 13/6/2024 done
