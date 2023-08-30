import React, { useEffect } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'
import app from '../db/db'
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Map from '../components/map';


export default function teste() {

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

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
                // ...
            } else {
                // User is signed out
                console.log('off')
                // ...
            }
        });

    }
    function LogOut() {
        const auth = getAuth(app);
        signOut(auth)
    }

    useEffect(() => {
        isLogged()
    }, [])

    return (
        <Box width={'100%'} height={'100vh'}>
        <Map/>
        </Box>
        
    )
}