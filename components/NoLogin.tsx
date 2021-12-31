import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Nav from "./Nav";

const NoLogin: NextPage = () => {
  const router = useRouter();
  return (
    <Flex w={"100%"} h={"100vh"} bg={"gray.50"} direction={"column"}>
      <Nav showBoth={true} />
    </Flex>
  );
};

export default NoLogin;
