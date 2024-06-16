import * as services from "../services";
import { query } from "express";

export const getAllProvince = async (req, res) => {
  try {
    const response = await services.getAllProvince();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProvinceById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getProvinceById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createProvince = async (req, res) => {
  try {
    const response = await services.createProvince(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateProvince = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateProvince(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteProvince = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteProvince(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
