import * as services from "../services";

export const getJobs = async (req, res) => {
  try {
    const response = await services.getJobs(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getJobById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getJobByEmployerId = async (req, res) => {
  try {
    const employer_id = req.params.employer_id;
    const response = await services.getJobByEmployerId(employer_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createNewJob = async (req, res) => {
  try {
    // check duoi client gui len co cac truong bat buoc ko
    // check deadline o duoi client
    if (
      !req.body?.vi_tri ||
      !req.body?.so_luong ||
      !req.body?.job_type_code ||
      !req.body?.salary_code ||
      !req.body?.province_cong_viec ||
      !req.body?.address_cong_viec ||
      !req.body?.job_field_code ||
      !req.body?.degree_code ||
      !req.body?.kinh_nghiem ||
      !req.body?.deadline ||
      !req.body?.id_employer
    ) {
      // 400
      return badRequest("Missing parameter", res);
    }
    const response = await services.createNewJob(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.send(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.updateJob(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// 5. delete by id
export const deleteJob = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteJob(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
