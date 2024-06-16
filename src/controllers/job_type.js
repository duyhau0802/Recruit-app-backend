import * as services from "../services";
import { query } from "express";

export const getAllJob_type = async (req, res) => {
  try {
    const response = await services.getAllJob_type();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getJob_typeById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getJob_typeById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createJob_type = async (req, res) => {
  try {
    const response = await services.createJob_type(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateJob_type = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateJob_type(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteJob_type = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteJob_type(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
