import { NextPage } from "next";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

interface Props {
  logs: String[];
}

const Logs: NextPage<Props> = ({ logs }) => {
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
      {logs
        .slice(0)
        .reverse()
        .map((item, index) => {
          return (
            <Box key={index}>
              <Text
                key={index}
                fontSize={"md"}
                my={1}
                fontWeight={"200"}
                fontFamily={"inherit"}
              >
                {item}
              </Text>
              <Divider borderColor={"gray.300"} />
            </Box>
          );
        })}
    </Flex>
  );
};

export default Logs;
