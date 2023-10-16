import React, { useEffect, useState } from 'react'
import { Box, Text, Button, Grid, Flex, calc } from '@chakra-ui/react'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import app from '../db/db'
import { collection, doc, getDoc, getFirestore, getDocs } from "firebase/firestore";
// import Map from '../components/map/map';
import Link from 'next/link';
import axios from 'axios'
import Sidebar from '../components/map/main/Sidebar';
import Header from '../components/map/Header';
import InitModal from '../components/map/main/InitModal';
import { useGlobalState, setGlobalState } from '../global/globalState';
import Map from '../components/map/map.tsx';
export default function main() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [endLat, setEndLat] = useState(null)
    const [endlong, setEndLong] = useState(null)
    const [isModalOpen, setIsModalOpen] = useGlobalState('isModalOpen');
    const [imovelData, setImovelData] = useState([])



    function isLogged() {
        const auth = getAuth(app);
        const db = getFirestore(app);

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                console.log(uid)
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                setIsAuthenticated(true)
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }

                // ...
            } else {
                // User is signed out
                setIsAuthenticated(false)
                // ...
            }
        });

    }
    function LogOut() {
        const auth = getAuth(app);
        signOut(auth)
    }
    function askLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);

                },
                (err) => {
                    setError(err.message);
                    // askLocation()
                }
            );
        } else {
            setError("Geolocalização não está disponível no seu navegador.");
        }
    }
    async function getImoveis() {
        const imovelDataArray = []; // Array para armazenar os documentos
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "imoveis"));
        querySnapshot.forEach((doc) => {
            // doc.data() é um único documento
            const documento = doc.data();
            imovelDataArray.push(documento); // Adicione o documento ao array
            // console.log(documento);
        });
        
        // Após o loop, defina imovelData com o array completo
        setImovelData(imovelDataArray);
        
    }

    useEffect(() => {
        // getlocalEnd()
        isLogged()
        getImoveis()
    }, [])


    if (isAuthenticated) {
        askLocation()
        return (
            <Box width={'100%'} position={'relative'} height={'100vh'}>

                {latitude !== null && longitude !== null ? <Box w='100%' height={'100%'}>
                    <Header />
                    {isModalOpen ? <InitModal /> : <></>}
                    {/* <InitModal/> */}
                    <Box display={'flex'} overflow={'hidden'} flex={'1'} h={'calc(100% - 60px)'}>
                        {/* <Sidebar /> */}
                        <Box w={'100%'}>
                            <Map datas={imovelData} latitude={latitude} longitude={longitude} />
                        </Box>
                    </Box>

                </Box> : <Text>dê permissao</Text>

                }
            </Box>

        )
    } else {
        return <Box w='full' g='100'>
            <Link href={'/login/signin'}>
                <Text>Você precisa estar logado para visualizar esta página</Text>
            </Link>
        </Box>
    }
}