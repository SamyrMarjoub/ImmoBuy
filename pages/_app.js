// import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
// import {globalState}
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )

}
