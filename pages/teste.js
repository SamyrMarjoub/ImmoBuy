import React, { useEffect, useState } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import app from '../db/db'
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Map from '../components/map';
import Link from 'next/link';
import axios from 'axios'


export default function teste() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null)
    const [endLat, setEndLat] = useState(null)
    const [endlong, setEndLong] = useState(null)


    function getlocalEnd() {
        const API_KEY = '0393eac023cd425cacf748b902467427';
        const end = 'rua juca pinto, bahia, ilheus'
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(end)}&key=${API_KEY}`;

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
                        setEndLong(longitude)
                        setEndLat(latitude)
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
                    getlocalEnd()

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

    useEffect(() => {
        isLogged()
        // if(isAuthenticated && latitude !== null && longitude !==null) askLocation()

    }, [])


    if (isAuthenticated) {
        askLocation()
        return (
            <Box width={'100%'} height={'100vh'}>
                {latitude !== null && longitude !== null ?
                    <Map latitude={endLat} longitude={endlong} /> : <Text>dê permissao</Text>

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