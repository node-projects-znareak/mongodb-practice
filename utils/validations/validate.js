import { validationError } from "../httpResponses";

/**
 * Validate the payload with Yup
 * @param {Object} schema The Yup schema object
 * @param {*} dataToValidate The data for validate with the `schema`
 */
export default function validate(schema) {
  // return the middleware
  return async (req, res, next) => {
    try {
      if (typeof schema.validate !== "function")
        return next("The `schema` params isn't a yup schema object");

      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err) {
      validationError(res, err);
    }
  };
}
