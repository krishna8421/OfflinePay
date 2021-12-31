import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import NoLogin from "../components/NoLogin";
import jwt from "jsonwebtoken";

const Home: NextPage = () => {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    const sessionToken = localStorage.getItem("jwt-token");
    if (sessionToken) {
      const decoded = jwt.verify(sessionToken, jwt_secret);
      // @ts-ignore
      const { username, number } = decoded;
      if (number !== null || true || number !== "") {
        setUsername(username);
        setNumber(number);
        setIsLogin(true);
      }
    }
  }, []);

  if (!isLogin) {
    return <NoLogin />;
  }
  return <Box>LOGIN</Box>;
};

export default Home;
