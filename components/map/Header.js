import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'

export default function Header() {
    return (
        <Flex alignItems={'center'} zIndex={'999'} w={'100%'} h={'60px'} bg='blue.700'>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'90%'} w='250px' bg={'red'}>Header</Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'90%'} flex={'1'} bg='blue.300'>Header</Box>

        </Flex>
    )
}
