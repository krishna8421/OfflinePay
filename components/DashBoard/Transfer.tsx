import { NextPage } from "next";
import { Field, Form, Formik } from "formik";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import { IoSend } from "react-icons/io5";

interface Props {
  reFetch: () => void;
}

const Transfer: NextPage<Props> = ({ reFetch }) => {
  const jwt_secret = process.env.JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const [error, setError] = useState({
    status: false,
    message: "",
  });

  type TransferData = {
    num: number;
    amount: number;
  };
  const transferMoney = async (data: TransferData) => {
    const sessionToken = Cookies.get("jwt-token");
    if (!sessionToken) {
      throw new Error("No session token");
    }
    const decoded = await jwt.verify(sessionToken, jwt_secret);

    // @ts-ignore
    const { num } = decoded;

    const { num: num_to, amount } = data;
    const res = await axios.post(
      "/api/transfer",
      {
        num_from: num,
        num_to,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt-token")}`,
        },
      }
    );
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
    }
    reFetch();
  };

  const transferSchema = Yup.object().shape({
    num: Yup.string()
      .matches(/([5-9]{1})[0-9]{9}/, "Must be a Number")
      .required("Required"),
    amount: Yup.string()
      .min(0, "Amount cannot be less than 0")
      .matches(/^[+]?([.]\d+|\d+([.]\d+)?)$/, "Out of Range")
      .required("Required"),
  });
  return (
    <Flex>
      <Formik
        initialValues={{
          num: "",
          amount: "",
        }}
        validationSchema={transferSchema}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            const { num, amount } = values;
            await transferMoney({
              num: parseInt(num, 10),
              amount: parseInt(amount, 10),
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
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      +91
                    </InputLeftElement>
                    <Input
                      variant="flushed"
                      {...field}
                      type="tel"
                      id="num"
                      maxLength="10"
                      placeholder="Number"
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.num}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="amount">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.amount && form.touched.amount}
                  mb={6}
                >
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none">
                      Rs.
                    </InputLeftElement>
                    <Input
                      variant="flushed"
                      {...field}
                      id="amount"
                      pr="4.5rem"
                      min="0"
                      placeholder="Amount"
                      focusBorderColor={"purple.400"}
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.amount}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex justify={"center"}>
              <IconButton
                margin={"auto"}
                icon={<IoSend />}
                my={4}
                color="gray.700"
                isLoading={props.isSubmitting}
                type="submit"
                aria-label={"Form Submit"}
              ></IconButton>
            </Flex>
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
  );
};

export default Transfer;
