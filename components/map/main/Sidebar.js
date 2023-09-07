import React from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import { useGlobalState, setGlobalState } from '../../../global/globalState';

export default function Sidebar() {

  const [isModalOpen, setIsModalOpen] = useGlobalState('isModalOpen');

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w='250px' height={'100vh'} bg='white'>
      <Flex w={'90%'} height={'90%'} justifyContent={'center'} alignItems={'center'}>
        <Button w={'100%'} height={'50px'} bg='#10a37f' onClick={() => setGlobalState('isModalOpen', true)}>Adicionar um imovel</Button>

      </Flex>
    </Box>
  )
}
