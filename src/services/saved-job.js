import db from "../models";

export const createSaved_job = async (id_user, id_tin) => {
  try {
    const applicant = await db.Applicant.findOne({
      where: { user_id: id_user },
    });
    if (applicant) {
      const id_ung_vien = applicant.id;
      const existing = await db.Saved_job.findOne({
        where: { id_ung_vien: id_ung_vien, id_tin: id_tin },
      });
      if (existing) {
        return "You already saved!";
      } else {
        const response = db.Saved_job.create({
          id_ung_vien: id_ung_vien,
          id_tin: id_tin,
        });
        return response;
      }
    } else {
      return "Applicant not found!";
    }
  } catch (error) {
    return error;
  }
};

// export const getAllSaved_job = async () => {
//   try {
//     const response = await db.Saved_job.findAll();
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const getSaved_jobById = async (id_user) => {
  try {
    const applicant = await db.Applicant.findOne({
      where: { user_id: id_user },
    });
    const id_ung_vien = applicant.id;
    const response = await db.Saved_job.findAll({
      where: { id_ung_vien: id_ung_vien },
      include: [
        {
          model: db.Job,
          attributes: [
            "id",
            "vi_tri",
            "deadline",
            "createdAt",
            "province_cong_viec",
          ],
          as: "jobData",
        },
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
};

// export const updateSaved_job = async (body, id) => {
//   try {
//     const response = await db.Saved_job.update(body, {
//       where: { id: id },
//     });
//     return response;
//   } catch (error) {
//     return error;
//   }
// };

export const deleteSaved_job = async (id) => {
  try {
    const response = await db.Saved_job.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
