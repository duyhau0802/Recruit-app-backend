import * as services from "../services";
import { badRequest } from "../middlewares/handle_errors";
import { refresh_token } from "../helper/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
  try {
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const registerEmployer = async (req, res) => {
  try {
    const response = await services.registerEmployer(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const response = await services.login(req.body);
    return res.json(response);
  } catch (error) {
    return res.json(error);
  }
};
export const refreshToken = async (req, res) => {
  try {
    const { error } = joi.object({ refresh_token }).validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await services.refreshToken(req.body.refresh_token);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message, res);
    const response = await services.resetPassword(req.body.email);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const resetUserPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const password = req.body.password;
    // const schema = joi.object({
    //   password: joi.string().required(),
    // });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message, res);

    const response = await services.resetUserPassword(password, token);
    return res.status(200).json(response);
  } catch (error) {
    return res.json(error);
  }
};
