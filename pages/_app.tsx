import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>OfflinePay</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
