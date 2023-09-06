import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function Header() {
    return (
        <Box zIndex={'999'} w={'100%'} h={'60px'} bg='blue.700'>
            <Text>Header</Text>
        </Box>
    )
}
