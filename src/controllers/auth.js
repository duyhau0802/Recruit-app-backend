import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";
import { email, password, refresh_token } from "../helper/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0].message, res);
    const response = await services.register(req.body);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(error, res);
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = joi.object({ email, password }).validate(req.body);
    if (error) return badRequest(error.details[0].message, res);

    // const { email, password } = req.body;
    // if (!email || !password)
    //   // 400 bad request
    //   return res.status(400).json({
    //     err: "1",
    //     mes: "Missing parameter",
    //   });

    const response = await services.login(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
    // return internalServerError(error, res);
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
