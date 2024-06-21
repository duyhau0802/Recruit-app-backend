import * as services from "../services";
import { query } from "express";

export const getAllEmployer = async (req, res) => {
  try {
    const response = await services.getAllEmployer();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getEmployerByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getEmployerByUserId(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createEmployer = async (req, res) => {
  try {
    const response = await services.createEmployer(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateEmployer = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateEmployer(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteEmployer = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteEmployer(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// getEmployerId
export const getEmployerId = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.getEmployerId(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
