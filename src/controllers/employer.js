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
    let user_id = req.params.id;
    const response = await services.updateEmployer(req.body, user_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateLogoCongTy = async (req, res) => {
  try {
    let user_id = req.params.id;
    let fileData = req.file;
    const response = await services.updateLogoCongTy( user_id, fileData);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
}