import {
    Flex,
    Button,
    Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";


const Nav: NextPage = () => {
    const router = useRouter();
    return(
        <Flex w="100%" h="5rem" bg="gray.100" align="center">
            <Text ml="1rem" fontSize="4xl">OfflinePay</Text>
        </Flex>
    )

}

export default Nav;