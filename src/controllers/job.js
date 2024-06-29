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

export const getJobByUserId = async (req, res) => {
  try {
    // const user_id = req.params.user_id;
    const response = await services.getJobByUserId(req.query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getJobByEmployerId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getJobByEmployerId(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createNewJob = async (req, res) => {
  try {
    // check duoi client gui len co cac truong bat buoc ko
    // check deadline o duoi client
    const id = req.params.id;
    const response = await services.createNewJob(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
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
