import { Flex } from "@chakra-ui/react";
import Nav from "../Nav";
import { NextPage } from "next";

interface Props {
  name?: string;
}

const DashBoardLayout: NextPage<Props> = ({ name }) => {
  return (
    <Flex>
      <Nav name={name} />
    </Flex>
  );
};
export default DashBoardLayout;
