import db from "../models";
import { Op } from "sequelize";

// READ
export const getJobs = ({ page, limit, order, name, ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      // nhớ thêm cái này : để nest data lại
      const queries = { raw: true, nest: true };
      // vi tri - offset : offset = 8 skip 8 cai dau tien
      const offset = !page || +page <= 1 ? 0 : +page - 1;
      const flimit = +limit || +process.env.LIMIT_JOB;
      // const offset = 0;
      // const flimit = 10;
      // limit : so luong ban ghi tren mot trang
      queries.offset = offset * flimit;
      queries.limit = flimit;
      if (order) queries.order = [order];
      if (name) query.vi_tri = { [Op.substring]: name };
      // find and count all : tra ve 1 object co 2 attribute (key) : count , rows
      const response = await db.Job.findAndCountAll({
        where: query,
        ...queries,
        attributes: {
          exclude: [
            "job_type_code",
            "salary_code",
            "province_cong_viec",
            "job_field_code",
            "degree_code",
            "id_employer",
          ],
        },
        include: [
          {
            model: db.Job_type,
            attributes: ["code", "value"],
            as: "jobTypeData",
          },
          {
            model: db.Salary,
            attributes: ["code", "value"],
            as: "salaryData",
          },
          {
            model: db.Province,
            attributes: ["code", "value"],
            as: "provinceData",
          },
          {
            model: db.Job_field,
            attributes: ["code", "value"],
            as: "jobFieldData",
          },
          {
            model: db.Degree,
            attributes: ["code", "value"],
            as: "degreeData",
          },
          {
            model: db.Employer,
            // attributes: { exclude: ["user_id"] },
            as: "employerData",
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got data" : "Can not found job",
        jobData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getJobById = async (id) => {
  try {
    const response = await db.Job.findOne({ where: { id } });
    return response;
  } catch (error) {
    return error;
  }
};

export const getJobByEmployerId = (employerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Job.findAll({
        where: { id_employer: employerId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// CREATE
export const createNewJob = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      // neu tim thay job có vi_tri giống hệt vi_tri đẫ có thì thôi >>
      const response = await db.Job.findOrCreate({
        where: { vi_tri: body?.vi_tri, id_employer: body?.id_employer },
        defaults: body,
      });
      resolve({
        // true neu ko tim thay va tao newJob
        err: response[1] ? 0 : 1,
        mes: response[1]
          ? "Created"
          : "Can not create job 'cause have the same title",
      });
    } catch (error) {
      reject(error);
    }
  });
// UPDATE

export const updateJob = async (body, id) => {
  try {
    const response = await db.Job.update(body, {
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

// DELETE
export const deleteJob = async (id) => {
  try {
    const response = await db.Job.destroy({
      where: { id: id },
    });
    return response;
  } catch (error) {
    return error;
  }
};
