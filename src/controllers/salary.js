import * as services from "../services";
import { query } from "express";

export const getAllSalary = async (req, res) => {
  try {
    const response = await services.getAllSalary();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getSalaryById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSalary = async (req, res) => {
  try {
    const response = await services.createSalary(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateSalary = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateSalary(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteSalary = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteSalary(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
