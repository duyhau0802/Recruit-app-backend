import joi from "joi";

export const email = joi.string().pattern(new RegExp("gmail.com$")).required();
export const password = joi.string().min(6).required();

//// table job
export const vi_tri = joi.string().alphanum().required();
export const so_luong = joi.number().required();
export const chuc_vu = joi.string().alphanum().required();
export const job_type_code = joi.string().alphanum().required();
export const salary = joi.string().alphanum().required();
export const province = joi.string().alphanum().required();
// export const address = joi.string();
export const job_field_code = joi.string().alphanum().required();
export const mo_ta = joi.string();
export const quyen_loi = joi.string();
// yeu cau cong viec
export const degree = joi.string().required();
export const yeu_cau_cong_viec = joi.string();
export const yeu_cau_ho_so = joi.string();
export const deadline = joi.string().required();
export const id_employer = joi.number().required();
export const view_count = joi.number();

// table others
export const code = joi.string().uppercase().alphanum().required();
export const value = joi.string().required();

// table resume

export const id = joi.number().required();
export const ids = joi.array().required();

export const file_name = joi.array().required();

export const refresh_token = joi.string().required();
