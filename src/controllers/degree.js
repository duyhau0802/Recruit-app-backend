import * as services from "../services";
import { query } from "express";

export const getAllDegree = async (req, res) => {
  try {
    const response = await services.getAllDegree();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDegreeById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getDegreeById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createDegree = async (req, res) => {
  try {
    const response = await services.createDegree(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateDegree = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateDegree(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteDegree = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteDegree(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
