import { Flex, Text } from "@chakra-ui/react";
import Nav from "../Nav";
import Transfer from "./Transfer";
import { NextPage } from "next";
import Logs from "./Logs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface Props {
  name?: string;
}

const DashBoardLayout: NextPage<Props> = ({ name }) => {
  const [logs, setLogs] = useState<String[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const getLog = async () => {
      const sessionToken = Cookies.get("jwt-token");

      const res = await axios.get("/api/data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      const { logs, balance } = res.data;
      setLogs(logs);
      setBalance(balance);
    };
    getLog().then();
    setRefetch(false);
  }, [refetch]);

  const reFetch = () => {
    setRefetch(true);
  };

  return (
    <Flex direction={"column"} align={"center"}>
      <Nav name={name} />
      <Text fontWeight={"500"} fontSize="2xl">
        Current Balance: Rs.{balance}
      </Text>
      <Text my={5} fontWeight={"300"} fontFamily={"monospace"} fontSize={"lg"}>
        Transfer
      </Text>
      <Transfer
        reFetch={() => {
          reFetch();
        }}
      />
      <Text my={5} fontWeight={"300"} fontFamily={"monospace"} fontSize={"lg"}>
        Logs
      </Text>
      <Logs logs={logs} />
    </Flex>
  );
};
export default DashBoardLayout;
