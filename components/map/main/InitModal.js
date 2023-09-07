import { Flex, Box, Text, Icon, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGlobalState, setGlobalState } from '../../../global/globalState';
import { AiOutlineClose } from 'react-icons/ai'
export default function InitModal() {

    const [isModalOpen, setIsModalOpen] = useGlobalState('isModalOpen');

    const [ruaName, setRuaName] = useState('')
    const [tituloImovel, setTituloImovel] = useState('')
    const [imovelNumero, setImovelNumero] = useState('')
    const [cidadeName, setCidadeName] = useState('')
    const [bairroName, setBairroName] = useState('')
    const [tipoAnuncio, setTipoAnuncio] = useState('')

    function cadastrarImovel(e) {
        e.preventDefault()
        const enderecoCompleto = tituloImovel + " " +  cidadeName + " " +  bairroName + " " +  ruaName + " " +  imovelNumero + tipoAnuncio
        console.log(enderecoCompleto)
    }

    return (
        <Flex position={'absolute'} justifyContent={'center'} alignItems={'center'} top={'0px'} left={'0px'} zIndex={'1111'} width={'100%'} height={'100%'} bg='#000000B3'>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} width={'400px'} paddingTop={'20px'} paddingBottom={'20px'} bg='white' borderRadius={'10px'} height={'auto'} zIndex={'99999'}>
                <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexDir={'column'} height={'90%'} position={'relative'} width={'90%'}>
                    <Icon cursor={'pointer'} onClick={() => setGlobalState('isModalOpen', false)} color={'black'} position={'absolute'} top='0px' right={'0px'} fontSize={'20px'} as={AiOutlineClose} />
                    <Text mt={'20px'} color={'black'} fontFamily={'monospace'} fontSize={'25px'}>Cadastro de imovel {isModalOpen}</Text>
                    <Box mt={'20px'} flex={'1'} w='100%'>
                        <form onSubmit={cadastrarImovel} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Input color={'gray.400'} onChange={(e) => setTituloImovel(e.target.value)} type='text' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Titulo do imovel' />
                            <Input color={'gray.400'} onChange={(e) => setCidadeName(e.target.value)} type='text' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Nome da cidade' />
                            <Input color={'gray.400'} onChange={(e) => setBairroName(e.target.value)} type='text' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Nome do bairro' />
                            <Input color={'gray.400'} onChange={(e) => setImovelNumero(e.target.value)} type='number' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Numero do Imovel' />
                            <Input color={'gray.400'} onChange={(e) => setRuaName(e.target.value)} type='text' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Nome da rua' />
                            <Select onChange={(e) => setTipoAnuncio(e.target.value)} color={'gray.400'} borderColor={'gray.200'} placeholder='Tipo de anuncio'>
                                <option value='venda'>Venda de imovel</option>
                                <option value='aluguel'>Aluguel</option>
                                <option value='outro'>Outro</option>
                            </Select>
                            <Input backgroundColor={'#10a37f'} type='submit' value={'Cadastrar Imovel'} />
                        </form>
                    </Box>
                </Box>
            </Box>
        </Flex>
    )
}
