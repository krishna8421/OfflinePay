import { Flex, Text } from "@chakra-ui/react";
import Nav from "../Nav";
import { NextPage } from "next";
import Logs from "./Logs";

interface Props {
  name?: string;
}

const DashBoardLayout: NextPage<Props> = ({ name }) => {
  return (
    <Flex direction={"column"} align={"center"}>
      <Nav name={name} />
      <Text my={5} fontWeight={"300"} fontFamily={"monospace"} fontSize={"lg"}>
        Transfers
      </Text>
      Transfer Happens Here
      <Text my={5} fontWeight={"300"} fontFamily={"monospace"} fontSize={"lg"}>
        Logs
      </Text>
      <Logs />
    </Flex>
  );
};
export default DashBoardLayout;
