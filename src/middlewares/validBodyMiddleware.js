import { handleInvalidRequestError } from "../utils/httpResponses.js";

const validBodyMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    handleInvalidRequestError(res);
  }
};

export default validBodyMiddleware;
