import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import joi from "joi";
import { id, ids, file_name } from "../helper/joi_schema";
const cloudinary = require("cloudinary").v2;

// READ
export const getResumes = async (req, res) => {
  try {
    const response = await services.getResumes(req.query);
    // neu client gui by data boy cua method post thi dung req.body
    // neu client gui len bang param thi lay bang req.query
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(error, res);
  }
};

// CREATE
export const createNewResume = async (req, res) => {
  try {
    const fileData = req.file;
    // xu li loi ko co truong Neu xay ra loi thi phai xoa file anh o tren server
    const { error } = joi.object({ id }).validate({ id: req.body.id_ung_vien });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }
    const response = await services.createNewResume(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return res.json(error);
  }
};

// UPDATE
export const updateResume = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = joi.object({ id }).validate({ id: req.body.id });
    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }
    const response = await services.updateResume(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return res.json(error);
  }
};

// DELETE
export const deleteResume = async (req, res) => {
  try {
    const { error } = joi.object({ ids, file_name }).validate(req.query);
    if (error) return badRequest(error.details[0].message, res);
    const response = await services.deleteResume(
      req.query.ids,
      req.query.file_name
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.json(error);
  }
};
