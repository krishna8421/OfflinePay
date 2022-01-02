import { Flex, Box, Text, Spacer } from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/OfflinePay.svg";
import React from "react";

interface Props {
  showBoth?: boolean;
  showLogin?: boolean;
  showRegister?: boolean;
  name?: string;
}

const Nav: NextPage<Props> = ({ showBoth, showLogin, showRegister, name }) => {
  return (
    <Flex w="100%" h="4rem" align="center">
      <Link href="/" passHref>
        <Box
          ml={"1rem"}
          _hover={{
            cursor: "pointer",
          }}
        >
          <a>
            <Image src={logo} alt="LOGO" layout="fixed" />
          </a>
        </Box>
      </Link>
      <Spacer />
      <Box mr={"1rem"}>
        {showBoth && (
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="500"
            fontFamily="mono"
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
            &nbsp;/&nbsp;
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Text>
        )}
        {showLogin && (
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="500"
            fontFamily="mono"
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Text>
        )}
        {showRegister && (
          <Text
            fontSize={["sm", "md", "lg"]}
            fontWeight="500"
            fontFamily="mono"
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Text>
        )}
        {name && (
          <Flex bg={"gray.200"} px={2} py={1.5} borderRadius={10}>
            <Text
              fontSize={["sm", "md", "lg"]}
              fontWeight="600"
              fontFamily="mono"
            >
              {name}
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default Nav;
