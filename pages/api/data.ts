import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async function Data(req: NextApiRequest, res: NextApiResponse) {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    res.status(200).json({
      status: "error",
      error: "Server ERR, JWT Secret not found.",
    });
    return;
  }
  if (req.method === "GET") {
    let token: any =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      res.status(401).send({
        message: "Access Denied",
      });
    }
    token = token.split(" ")[1];
    if (!token) {
      res.status(401).send({
        message: "No token provided",
      });
      return;
    }
    let decoded: any = jwt.verify(token, jwt_secret);
    if (!decoded) {
      res.status(401).send({
        message: "Access Denied",
      });
    }
    const { num } = decoded;
    const user = await User.findOne({ num });
    if (!user) {
      res.status(401).send({
        message: "Access Denied",
      });
    }
    const { transactions, balance } = user;
    if (!transactions) {
      res.status(200).json({
        status: "error",
        error: "No transactions found.",
      });
      return;
    }
    res.status(200).json({
      logs: transactions,
      balance: balance,
    });
  }
}
