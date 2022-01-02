import { useRouter } from "next/router";
import axios from "axios";
import { NextPage } from "next";
import { useState } from "react";
import Nav from "../components/Nav";
import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputLeftAddon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const Login: NextPage = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const handleClick = () => setShow(!show);
  const router = useRouter();
  type LoginData = {
    pass: string;
    num: number;
  };
  const loginUser = async (data: LoginData) => {
    const res = await axios.post("/api/login", data);
    if (res.data.status === "error") {
      setError({
        status: true,
        message: res.data.error,
      });
    }
    if (res.data.status === "success") {
      setError({
        status: false,
        message: "",
      });
      localStorage.setItem("jwt-token", res.data.token);
      await router.push("/");
    }
  };

  const loginSchema = Yup.object().shape({
    pass: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^[a-zA-Z0-9 #?!@$%^&*-]/, "Must be Alphanumeric")
      .required("Required"),
    num: Yup.string()
      .matches(/([5-9]{1})[0-9]{9}/, "Must be a Number")
      .required("Required"),
  });

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      bg={"gray.50"}
      direction={"column"}
      align={"center"}
    >
      <Nav showRegister={true} />
      <Flex
        mt={"5rem"}
        w={"90%"}
        direction={"column"}
        align={"center"}
        justify={"center"}
      >
        <Text mb={"2rem"} fontSize="4xl">
          Login
        </Text>
        <Formik
          initialValues={{
            num: "",
            pass: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            setTimeout(async () => {
              const { num, pass } = values;
              await loginUser({
                num: parseInt(num, 10),
                pass,
              });
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form noValidate>
              <Field name="num">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.num && form.touched.num}
                    mb={6}
                  >
                    <FormLabel id="num" htmlFor="num">
                      Number
                    </FormLabel>
                    <InputGroup>
                      {/* eslint-disable-next-line react/no-children-prop */}
                      <InputLeftAddon children="+91" />
                      <Input
                        {...field}
                        type="tel"
                        id="num"
                        maxLength="10"
                        placeholder="phone number"
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.num}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="pass">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.pass && form.touched.pass}
                    mb={6}
                  >
                    <FormLabel id="pass" htmlFor="pass">
                      Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        id="pass"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.pass}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                w={"100%"}
                my={4}
                colorScheme="green"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
              <Flex justify={"center"}>
                <Text fontSize={"lg"} color={"red.500"}>
                  {" "}
                  {error.status ? error.message : ""}{" "}
                </Text>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Login;
