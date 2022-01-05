import type { NextApiRequest, NextApiResponse } from "next";
import mongoDB from "../../utils/mongoDB";
import User from "../../models/User";
import { TransferSchema } from "../../utils/apiDataValidation";
import moment from "moment";
import jwt from "jsonwebtoken";

export default async function transfer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    res.status(200).json({
      status: "error",
      error: "Server ERR, JWT Secret not found.",
    });
    return;
  }
  await mongoDB();
  if (req.method === "GET") {
    res.send("Hey Welcome to Transfer API");
  }
  if (req.method === "POST") {
    let token: any =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      res.status(401).send({
        message: "Access Denied",
      });
    }
    token = token.split(" ")[1];
    let decoded: any = jwt.verify(token, jwt_secret);
    if (!decoded) {
      res.status(401).send({
        message: "Access Denied",
      });
    }

    if (!req.body) {
      res.status(200).json({
        status: "error",
        error: "No Data Found",
      });
      return;
    }
    const { error } = TransferSchema.validate(req.body);
    if (error) {
      res.status(200).json({
        status: "error",
        error: error.message,
      });
      return;
    }
    const { num_from, num_to, amount } = req.body;
    const { num: jwtNum } = decoded;

    // Check if the user is using someone else's account
    if (jwtNum !== num_from) {
      res.status(200).json({
        status: "error",
        error: "Lol You can't use Others Token",
      });
      return;
    }

    // Check if same user is sending the money
    if (num_from === num_to) {
      res.status(200).json({
        status: "error",
        error: "You can't transfer to same number",
      });
      return;
    }

    // Check if user to send mony exists
    if (!(await User.findOne({ num: num_to }))) {
      res.status(200).json({
        status: "error",
        error: "User not found",
      });
      return;
    }

    // Check if user has enough balance
    const fromUsrData = await User.findOne({ num: num_from });
    if (fromUsrData.balance < amount) {
      res.status(200).json({
        status: "error",
        error: "You don't have enough balance",
      });
      return;
    }

    const user_to = await User.updateOne(
      { num: num_to },
      {
        $inc: { balance: amount },
        $push: {
          transactions: `[${moment().format(
            "Do MMM YYYY, h:mm a"
          )}] Received Rs.${amount} from +91${num_from}`,
        },
      },
      {
        multi: true,
        upsert: true,
      }
    );

    // IDK why
    if (!user_to.acknowledged) {
      res.status(200).json({
        status: "error",
        error: "Try again after some time",
      });
      return;
    }

    const user_from = await User.updateOne(
      { num: num_from },
      {
        $inc: { balance: -amount },
        $push: {
          transactions: `[${moment().format(
            "Do MMM YYYY, h:mm a"
          )}] Send Rs.${amount} to +91${num_to}`,
        },
      },
      {
        multi: true,
        upsert: true,
      }
    );

    // IDK why
    if (!user_from.acknowledged) {
      res.status(200).json({
        status: "error",
        error: "Try again after some time",
      });
      return;
    }

    // If everything is fine.
    res.status(200).json({
      status: "success",
      message: "Amount Transferred Successfully",
    });
  }
}
