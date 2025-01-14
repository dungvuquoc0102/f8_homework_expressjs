import handleRes from "../utils/handleRes.js";

const validateReqBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    handleRes.handleInvalidRequestError(res);
  }
};

export default validateReqBody;
