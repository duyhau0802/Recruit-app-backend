import * as services from "../services";

// export const getAllSaved_job = async (req, res) => {
//   try {
//     const response = await services.getAllSaved_job();
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

export const getSaved_jobById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await services.getSaved_jobById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createSaved_job = async (req, res) => {
  try {
    const id_user = req.body.id_user;
    const id_tin = req.body.id_tin;
    const response = await services.createSaved_job(id_user, id_tin);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// export const updateSaved_job = async (req, res) => {
//   try {
//     let id = req.params.id;
//     const response = await services.updateSaved_job(req.body, id);
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

export const deleteSaved_job = async (req, res) => {
  try {
    let id = req.params.id;
    const response = await services.deleteSaved_job(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
