import React, { useEffect, useState } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import app from '../db/db'
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Map from '../components/map';
import Link from 'next/link';


export default function teste() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null)

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

    useEffect(() => {
        isLogged()
        // if(isAuthenticated && latitude !== null && longitude !==null) askLocation()

    }, [])


    if (isAuthenticated) {
        askLocation()
        return (
            <Box width={'100%'} height={'100vh'}>
                {latitude !== null && longitude !== null ?
                    <Map latitude={latitude} longitude={longitude} /> : <Text>dê permissao</Text>

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