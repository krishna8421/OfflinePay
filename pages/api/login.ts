import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import mongoDB from "../../utils/mongoDB";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import { LoginSchema } from "../../utils/apiDataValidation";

type UserType = {
  _id: string;
  name: string;
  num: number;
  pass: string;
  __v: number;
};

const passCompare = async (
  name: string,
  num: number,
  pass: string,
  dbPass: string,
  res: NextApiResponse
) => {
  const jwt_secret = process.env.JWT_SECRET;

  if (!jwt_secret) {
    res.status(200).json({
      status: "error",
      error: "Server ERR, JWT Secret not found.",
    });
    return;
  }
  if (!(await bcrypt.compare(pass, dbPass))) {
    res.status(200).json({
      status: "error",
      error: "Invalid Number or Password",
    });
    return;
  }
  return jwt.sign({ name, num }, jwt_secret, {
    expiresIn: "7d",
  });
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await mongoDB();
  if (req.method === "GET") {
    res.send("Hey Welcome to Login API");
  }
  if (req.method === "POST") {
    if (!req.body) {
      res.status(200).json({
        status: "error",
        error: "No Data Found",
      });
      return;
    }

    const { error } = LoginSchema.validate(req.body);
    if (error) {
      res.status(200).json({
        status: "error",
        error: "Invalid Data",
      });
      return;
    }
    const { num, pass } = req.body;

    if (!num || !pass) {
      res.status(200).json({
        status: "error",
        error: "Please fill all the fields",
      });
      return;
    }

    const user: UserType = await User.findOne({ num });
    if (!user) {
      res.status(200).json({
        status: "error",
        error: "User not found",
      });
      return;
    }
    const { pass: dbPass, name } = user;
    const token = await passCompare(name, num, pass, dbPass, res);
    if (token) {
      res.status(200).json({
        status: "success",
        token,
      });
    }
  }
}
