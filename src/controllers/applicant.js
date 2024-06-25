import * as services from "../services";
import { query } from "express";

export const getAllApplicant = async (req, res) => {
  try {
    const response = await services.getAllApplicant();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getApplicantByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getApplicantByUserId(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createApplicant = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.createApplicant(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const updateApplicant = async (req, res) => {
  try {
    let user_id = req.params.id;
    const response = await services.updateApplicant(req.body, user_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
