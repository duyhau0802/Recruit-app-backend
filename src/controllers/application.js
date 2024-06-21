import * as services from "../services";
import { query } from "express";

export const getAllApplication = async (req, res) => {
  try {
    const response = await services.getAllApplication();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getApplicationByApplicantId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getApplicationByApplicantId(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getApplicationByEmployerId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getApplicationByEmployerId(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getApplicationById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createApplication = async (req, res) => {
  try {
    const response = await services.createApplication(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateApplication = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateApplication(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteApplication = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteApplication(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
