import handleRes from "../utils/handleRes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const verifyUser = async (req, res, next) => {
  //s1: get token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    handleRes.handleInvalidRequestError(res);
    return;
  }

  //s2: verify token
  console.log(token);
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedData) {
    handleRes.handleInvalidRequestError(res);
    return;
  }

  //s3: get user
  const user = await User.findById(decodedData._id);
  if (!user) {
    handleRes.handleInvalidRequestError(res);
    return;
  }

  //s4: hide password
  user.password = undefined;

  //s5: attach user to request
  req.user = user;

  //s6: call next
  next();
};

export default verifyUser;
