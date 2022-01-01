import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoDB from "../../utils/mongoDB";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import { RegisterSchema } from "../../utils/apiDataValidation";

const saveToDB = async (
  name: string,
  num: number,
  pass: string,
  res: NextApiResponse
) => {
  const jwt_secret = process.env.JWT_SECRET;
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(pass, salt);
  const newUser = new User({ name, pass: hashedPass, num });

  if (!jwt_secret) {
    res.status(200).json({
      status: "error",
      error: "Server ERR, JWT Secret not found.",
    });
    return;
  }
  const saved = await newUser.save();
  if (!saved) {
    res.status(200).json({
      status: "error",
      error: "Server ERR, User not saved.",
    });
    return;
  }
  return jwt.sign({ name, num }, jwt_secret, {
    expiresIn: "7d",
  });
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoDB();
  if (req.method === "GET") {
    res.send("Hey Welcome to Register API");
  }
  if (req.method === "POST") {
    if (!req.body) {
      res.status(200).json({
        status: "error",
        error: "No Data Found",
      });
      return;
    }
    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      res.status(200).json({
        status: "error",
        error: error.message,
      });
      return;
    }

    const { name, num, pass } = req.body;

    if (!name || !num || !pass) {
      res.status(200).json({
        status: "error",
        error: "Please fill all the fields",
      });
      return;
    }
    const userExists = await User.findOne({ num });
    if (userExists) {
      return res.status(200).json({
        status: "error",
        error: "User already exists",
      });
    }

    const token = await saveToDB(name, num, pass, res);
    if (!token) {
      return res.status(200).json({
        status: "error",
        error: "Server ERR, Token not generated.",
      });
    }
    return res.status(200).json({
      status: "success",
      error: null,
      token,
    });
  }
}
