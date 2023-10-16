import { Box, Text, Flex,Button } from '@chakra-ui/react'
import React from 'react'
import { useGlobalState, setGlobalState } from '../../global/globalState';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useGlobalState('isModalOpen');

    return (
        <Flex alignItems={'center'} bg='white' zIndex={'999'} w={'100%'} h={'60px'} >
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'90%'} w='250px' >
                <Button w={'70%'} height={'45px'} bg='#10a37f' onClick={() => setGlobalState('isModalOpen', true)}>Adicionar um imovel</Button>

            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'90%'} flex={'1'}>Header</Box>

        </Flex>
    )
}
