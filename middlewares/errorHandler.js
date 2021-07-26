const boom = require("@hapi/boom");
const { isRequestAjaxOrApi } = require("../utils/helpers");
const message = require("../utils/messages");

function logErrors(err, req, res, next) {
  message.error(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  // err ya tiene un error tipo Boom
  next(err);
}

function clientErrorHandling(err, req, res, next) {
  /*  err es una instancia de Boom, por lo tanto se puede acceder a err.output
      https://hapi.dev/module/boom/api/?v=9.1.2
  */
  const { statusCode, payload } = err.output;
  // catch errors ajax or errors while streaming
  if (isRequestAjaxOrApi(req) || req.headersSent) {
    const response = { ...payload };
    response.errorDescription = err.message;
    return res.status(statusCode).json(response);
  }

  // si no es una peticion fetch, entonces renderizamos una pagina de error
  next(err);
}

function errorHandling(err, req, res, next) {
  const { statusCode, payload } = err.output;
  res.status(statusCode);
  res.render("error", payload);
}

function wrapServerErrors(app) {
  if (typeof app.use !== "function") {
    throw new Error("The `app` param isn't a instace of express ");
  }
  app.use((req, res, next) => {
    res.status(404).json({ status: 404, data: "Not Found" });
    next();
  });
  // insertar los middlewares de errores en el servidor `app`
  app.use(logErrors);
  app.use(wrapErrors);
  app.use(clientErrorHandling);
  app.use(errorHandling);
}

module.exports = wrapServerErrors;