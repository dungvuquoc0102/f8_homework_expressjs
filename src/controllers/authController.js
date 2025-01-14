import User from "../models/User.js";
import bcrypt from "bcrypt";
import handleRes from "../utils/handleRes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authController = {
  register: async (req, res) => {
    try {
      //check if user already exists
      const userWithEmail = await User.findOne({ email: req.body.email });
      const userWithUsername = await User.findOne({
        username: req.body.username,
      });
      if (userWithEmail || userWithUsername) {
        handleRes.handleUserAlreadyExists(res);
        return;
      }

      //hash password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      //create new user
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      //hide password
      newUser.password = undefined;

      //send response
      handleRes.handleCreatedResponse(res, newUser);
    } catch (error) {
      handleRes.handleServerError(res, error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    //s1: check if email is correct
    const user = await User.findOne({ email });
    if (!user) {
      return handleRes.handleNotFoundError(res);
    }

    //s2: check if password is correct
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return handleRes.handleNotFoundError(res);
    }

    //s3: gen token
    const accessToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" },
    );

    //s4: hide password
    user.password = undefined;

    //s5: send response
    return handleRes.handleSucessResponse(res, { user, accessToken });
  },
};

export default authController;
