import * as services from "../services";
import { internalServerError, badRequest } from "../middlewares/handle_errors";

export const getJobs = async (req, res) => {
  try {
    const response = await services.getJobs(req.query);
    // neu client gui by data boy cua method post thi dung req.body
    // neu client gui len bang param thi lay bang req.query
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};

export const createNewJob = async (req, res) => {
  try {
    // check duoi client gui len co cac truong bat buoc ko
    // check deadline o duoi client
    if (
      !req.body?.vi_tri ||
      !req.body?.so_luong ||
      !req.body?.chuc_vu ||
      !req.body?.job_type_code ||
      !req.body?.salary_code ||
      !req.body?.province_cong_viec ||
      !req.body?.address_cong_viec ||
      !req.body?.job_field_code ||
      !req.body?.degree_code ||
      !req.body?.deadline ||
      !req.body?.id_employer
    ) {
      // 400
      return badRequest("Missing parameter", res);
    }
    const response = await services.createNewJob(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return internalServerError(res);
  }
};
