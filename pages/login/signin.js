import React, { useState } from 'react'
import app from '../../db/db'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { Box, Input, Text, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { doc, setDoc, getFirestore } from "firebase/firestore"; 

export default function Signin() {

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const router = useRouter()

    function singIn(e) {
        e.preventDefault()
        const auth = getAuth(app);
        const db = getFirestore(app);

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
            router.push('/teste')
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)

            });
    }

    return (
        <Box display={'flex'} bg='white' justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'} >
            {/* <Box p='20px' bg='white' width={'400px'} height={'400px'} display={'flex'} justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
                <Text fontSize={'40px'} color={'black'}>Bem vindo novamente</Text>
                <form onSubmit={singIn}>
                    <Input onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' />
                    <Input onChange={(e) => setEmail(e.target.value)} type='text' mb={'10px'} />
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' mb={'10px'} />
                    <Input value={'Registrar'} type='submit' />
                </form>


            </Box> */}
             <Box p='20px' bg='white' width={'350px'} height={'400px'} display={'flex'} justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
                <Text color={'black'} fontFamily='monospace' letterSpacing={'-1px'} fontWeight={'600'} fontSize={'35px'}>Bem vindo :)</Text>
                {/* <Text color={'black'} fontSize={'15px'} textAlign={'center'} lineHeight={'20px'} letterSpacing={'0px'} whiteSpace={'50px'}>A verificação de dois fatores poderá ser necessária para a criação de uma nova conta, tudo isso por fins de segurança.</Text> */}

                <form onSubmit={singIn}>
                    <Input mt='10px' borderRadius={'2px'} height={'50px'} border={'1px solid #0000004d'} _placeholder={{ color: '#0000004d', letterSpacing: '1px' }} color={'black'} placeholder='Email' onChange={(e) => setEmail(e.target.value)} type='text' />
                    <Input mt='10px' borderRadius={'2px'} height={'50px'} border={'1px solid #0000004d'} _placeholder={{ color: '#0000004d', letterSpacing: '1px' }} color={'black'} placeholder='Senha' onChange={(e) => setPassword(e.target.value)} type='password' mb={'10px'} />
                    <Input mt={'5px'} cursor={'pointer'} width={'100%'} bg='#10a37f' height={'50px'} value={'Continue'} type='submit' />
                </form>
                <Text mt={'10px'} fontSize={'15px'} color={'black'} textAlign={'center'}>Não tem uma conta? <Link color={'#10a37f'} href='/login/signon'>Registre-se</Link></Text>


            </Box>
        </Box>

    )
}
