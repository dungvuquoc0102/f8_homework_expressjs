import handleRes from "../utils/handleRes.js";

const checkPermission = (req, res, next) => {
  if (req.user.role !== "admin") {
    handleRes.handleInvalidRequestError(res);
  } else {
    next();
  }
};

export default checkPermission;
