import { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";

const Logs = () => {
  return (
    <Flex
      direction="column"
      align="center"
      p={2}
      bg={"gray.100"}
      w={["95%", "90%", "70%", "60%"]}
      borderRadius={5}
      h={"25rem"}
      mb={20}
      overflow={["scroll"]}
    >
      <Text fontSize={"md"} my={1} fontWeight={"200"} fontFamily={"inherit"}>
        $[Jan 02 2022 23:14] +919876543245 transferred &quot;Rs. 10000&quot; to
        +919876543212
      </Text>
    </Flex>
  );
};

export default Logs;
