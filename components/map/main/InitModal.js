import { Flex, Box, Text, Icon, Input, Select, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGlobalState, setGlobalState } from '../../../global/globalState';
import { AiOutlineClose } from 'react-icons/ai'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import axios from 'axios';
import app from '../../../db/db';
import randomId from 'random-id'
const len = 4
const pattern = '301'
export default function InitModal() {

    const [isModalOpen, setIsModalOpen] = useGlobalState('isModalOpen');
    const [ruaName, setRuaName] = useState('')
    const [tituloImovel, setTituloImovel] = useState('')
    const [imovelNumero, setImovelNumero] = useState('')
    const [cidadeName, setCidadeName] = useState('')
    const [bairroName, setBairroName] = useState('')
    const [tipoAnuncio, setTipoAnuncio] = useState('')
    const [pais, setPais] = useState('')
    const [estado, setEstado] = useState('')
    const toast = useToast()

    function cadastrarImovel(e) {
        e.preventDefault()
        const enderecoCompleto = pais.toLowerCase() + "," + estado.toLowerCase() + "," +  cidadeName.toLowerCase() + "," +  bairroName.toLowerCase()
        // console.log(enderecoCompleto)
        getlocalEnd(enderecoCompleto)


    }

    function getlocalEnd(end) {
        const API_KEY = '0393eac023cd425cacf748b902467427';
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(end)}&key=${API_KEY}`;
        const db = getFirestore(app);

        axios.get(url)
            .then(response => {
                // Verifique se a resposta foi bem-sucedida
                if (response.status === 200) {
                    // Parseie a resposta JSON
                    const data = response.data;

                    // Verifique se a resposta possui resultados
                    if (data.results && data.results.length > 0) {
                        // Obtenha as coordenadas geográficas (latitude e longitude)
                        const latitude = data.results[0].geometry.lat;
                        const longitude = data.results[0].geometry.lng;
                        const auth = getAuth();
                        onAuthStateChanged(auth, async (user) => {
                            if (user) {
                                const uid = user.uid;
                                const id = randomId(len, pattern)
                                await setDoc(doc(db, "imoveis", id), {
                                    id: id,
                                    uid: uid,
                                    tituloImovel: tituloImovel,
                                    tipoAnuncio: tipoAnuncio,
                                    latitude: latitude,
                                    longitude: longitude,
                                    pais:pais,
                                    estado:estado

                                });
                                toast({
                                    title: 'Sucesso!!.',
                                    description: "O imovel foi cadastrado com sucesso no sistema!.",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                    position: 'top'
                                })
                            } else {
                                console.log('error, faz o login')
                            }
                        });

                        // Exiba as coordenadas
                        console.log(`Latitude: ${latitude}`);
                        console.log(`Longitude: ${longitude}`);
                    } else {
                        console.log('Nenhum resultado encontrado.');
                    }
                } else {
                    console.log('Erro na solicitação.');
                }
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
            });

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
                            <Input color={'gray.400'} onChange={(e) => setPais(e.target.value)} type='text' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Pais' />
                            <Input color={'gray.400'} onChange={(e) => setEstado(e.target.value)} type='text' _placeholder={{ opacity: 1, color: 'gray.400' }} borderColor={'gray.200'} placeholder='Estado' />
                        
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
