import { id_employer } from "../helper/joi_schema";
import db from "../models";

export const createApplication = (body) =>
  new Promise(async (resolve, reject) => {
    const id_user = body?.id_user;
    const applicant = await db.Applicant.findOne({
      where: { user_id: id_user },
    });
    const id_ung_vien = applicant?.id;
    const id_tin = body?.id_tin;
    const id_resume = body?.id_resume;
    const job = await db.Job.findOne({ where: { id: id_tin } });
    const id_employer = job?.id_employer;
    const existingApply = await db.Application.findOne({
      where: { id_ung_vien: id_ung_vien, id_tin: id_tin },
    });
    try {
      if (existingApply) {
        resolve({
          err: 1,
          mes: "Apply already exists!",
        });
      } else {
        const response = db.Application.create({
          id_ung_vien,
          id_tin,
          id_employer,
          id_resume,
        });
        resolve(response);
      }
    } catch (error) {
      reject(error);
    }
  });

export const getAllApplication = async () => {
  try {
    const response = await db.Application.findAll();
    return response;
  } catch (error) {
    return error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const response = await db.Application.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const getApplicationByApplicantId = async (user_id) => {
  try {
    const ung_vien = await db.Applicant.findOne({
      where: { user_id: user_id },
    });
    const id_ung_vien = ung_vien.id;
    const response = await db.Application.findAll({
      where: { id_ung_vien },
      attributes: {
        exclude: ["id_ung_vien", "id_tin", "id_employer", "id_resume"],
      },
      include: [
        {
          model: db.Employer,
          attributes: ["ten_cong_ty", "logo_cong_ty"],
          as: "employerData",
        },
        {
          model: db.Job,
          attributes: ["vi_tri", "deadline", "createdAt", "province_cong_viec"],
          as: "jobData",
        },
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getApplicationByEmployerId = async (user_id) => {
  try {
    const employer = await db.Employer.findOne({
      where: { user_id: user_id },
    });
    const id_employer = employer.id;
    const response = await db.Application.findAll({
      where: { id_employer },
      attributes: {
        exclude: ["id_ung_vien", "id_tin", "id_employer", "id_resume"],
      },
      include: [
        {
          model: db.Job,
          as: "jobData",
          attributes: ["vi_tri", "deadline", "createdAt", "province_cong_viec"],
        },
        {
          model: db.Applicant,
          as: "ungVienData",
          include: [
            {
              model: db.User,
              as: "userData",
              attributes: ["username", "avatar"],
            },
            {
              model: db.Degree,
              as: "degreeData",
              attributes: ["value"],
            },
          ],
          attributes: ["sdt", "kinh_nghiem"],
        },
        {
          model: db.Resume,
          as: "resumeData",
          attributes: ["cv_link"],
        },
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateApplication = async (body, id) => {
  try {
    const response = await db.Application.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await db.Application.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
