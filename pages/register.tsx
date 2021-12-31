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
import register from "./api/register";

const Register: NextPage = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const handleClick = () => setShow(!show);
  const router = useRouter();
  type RegisterData = {
    name: string;
    pass: string;
    num: number | null;
  };
  const registerUser = async (data: RegisterData) => {
    const res = await axios.post("/api/register", data);

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

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Required"),
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
      <Nav showLogin={true} />
      <Flex
        mt={"5rem"}
        w={"30%"}
        direction={"column"}
        align={"center"}
        justify={"center"}
      >
        <Text mb={"2rem"} fontSize="4xl">
          Register
        </Text>
        <Formik
          initialValues={{
            name: "",
            num: null,
            pass: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values, actions) => {
            setTimeout(async () => {
              await registerUser(values);
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form noValidate>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mb={6}
                  >
                    <FormLabel htmlFor="num">Name</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      maxLength="40"
                      placeholder="Name"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="num">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.num && form.touched.num}
                    mb={6}
                  >
                    <FormLabel htmlFor="num">Number</FormLabel>
                    <InputGroup>
                      {/* eslint-disable-next-line react/no-children-prop */}
                      <InputLeftAddon children="+91" />
                      <Input
                        {...field}
                        type="tel"
                        id="num"
                        maxLength="10"
                        placeholder="Phone Number"
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
                    <FormLabel htmlFor="pass">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        id="pass"
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Password"
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

export default Register;
