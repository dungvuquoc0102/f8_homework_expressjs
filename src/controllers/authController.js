import User from "../models/User.js";
import bcrypt from "bcrypt";

const authController = {
  register: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Success", data: newUser });
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ message: "Success", data: user });
    }
  },
};

export default authController;
