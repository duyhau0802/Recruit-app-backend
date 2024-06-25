import * as services from "../services";
import { internalServerError } from "../middlewares/handle_errors";

export const getAllUser = async (req, res) => {
  try {
    const response = await services.getAllUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getUserById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getApplicantById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// UPDATE
export const updateUser = async (req, res) => {
  try {
    let fileData = req.file;
    const response = await services.updateUser(req.body, fileData);
    return res.send(response);
  } catch (error) {
    return res.send(error);
  }
};
//delete

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.deleteUser(id);
    return res.json(response);
  } catch (error) {
    return res.send(error);
  }
};
