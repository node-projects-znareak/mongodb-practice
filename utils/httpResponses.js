function unauthorized(res, message) {
  res
    .status(401)
    .json({ ok: false, error: true, data: message, statusCode: 401 });
}

function invalidToken(res) {
  res.json(unauthorized(res, "The user's token is invalid"));
}

function validationError(res, data) {
  res.status(400).json({
    ok: false,
    error: data.name || "ValidationError",
    data: data.errors || data.message || data,
  });
}

function error(
  res,
  data = "An error while process the request",
  statusCode = 400
) {
  res.status(statusCode).json({
    ok: false,
    error: true,
    data,
    statusCode,
  });
}
function success(
  res,
  data = "The request processed successfuly",
  statusCode = 200
) {
  res.status(statusCode).json({
    ok: true,
    error: false,
    data,
    statusCode,
  });
}

module.exports = {
  validationError,
  unauthorized,
  invalidToken,
  success,
  error,
};
