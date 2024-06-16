import * as services from "../services";
import { query } from "express";

export const getAllJob_field = async (req, res) => {
  try {
    const response = await services.getAllJob_field();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getJob_fieldById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getJob_fieldById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createJob_field = async (req, res) => {
  try {
    const response = await services.createJob_field(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateJob_field = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateJob_field(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteJob_field = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteJob_field(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
