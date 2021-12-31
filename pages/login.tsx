import { useRouter } from "next/router";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios("/api/login", {
      method: "POST",
      data: {
        number,
        password,
      },
    });
    if (res.data.status === "success") {
      localStorage.setItem("jwt-token", res.data.token);
      await router.push("/");
    }
  };
  return <></>;
};

export default Login;
