import createError from "http-errors";

// 400
export const badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

// 500
export const internalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

//404
export const notFound = (req, res) => {
  const error = createError.NotFound("This route is not define");
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};

// 401
export const notAuth = (err, res) => {
  const error = createError.Unauthorized(err);
  return res.status(error.status).json({
    err: 1,
    mes: error.message,
  });
};
