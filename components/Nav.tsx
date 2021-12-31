import { Flex, Box, Text, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/OfflinePay.svg";

const Nav: NextPage = () => {
  return (
    <Flex w="100%" h="4rem" align="center">
      <Box ml={"1rem"}>
        <Image src={logo} alt="LOGO" layout="fixed" />
      </Box>
      <Spacer />
      <Box mr={"1rem"}>
        <Text fontSize={["sm", "md", "lg"]} fontWeight="500" fontFamily="mono">
          <Link href="/login">
            <a>Login</a>
          </Link>
          &nbsp;/&nbsp;
          <Link href="/register">
            <a>Register</a>
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Nav;
