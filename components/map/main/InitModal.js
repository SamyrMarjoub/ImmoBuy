import { Flex, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useGlobalState, setGlobalState } from '../../../global/globalState';

export default function InitModal() {

    const [isModalOpen, setIsModalOpen] = useGlobalState('isModalOpen');


    return (
        <Flex position={'absolute'} justifyContent={'center'} alignItems={'center'} top={'0px'} left={'0px'} zIndex={'1111'} width={'100%'} height={'100%'} bg='#000000B3'>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'400px'} bg='white' borderRadius={'10px'} height={'400px'} zIndex={'99999'}>
                <Box width={'90%'}>
                    <Text mt={'20px'} color={'black'}>Cadastro de imovel {isModalOpen}</Text>

                </Box>
            </Box>
        </Flex>
    )
}
