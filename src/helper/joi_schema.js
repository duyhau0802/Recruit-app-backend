import joi from "joi";

export const email = joi.string().pattern(new RegExp("gmail.com$")).required();
export const password = joi.string().min(6).required();

// // table job
// export const vi_tri = joi.string().alphanum().required();
// export const so_luong
// export const chuc_vu
// export const job_type_code
// export const salary
// export const province
// export const address
// export const job_field_code
// export const mo_ta
// export const quyen_loi
//  // yeu cau cong viec
// export const degree
// export const yeu_cau_cong_viec
// export const yeu_cau_ho_so
// export const deadline
// export const id_employer
// export const view_count
