import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDyp9ECZs1yjsfNNfFn36dpqkpWrjq5s3g",
  authDomain: "immobuy-bbf8d.firebaseapp.com",
  projectId: "immobuy-bbf8d",
  storageBucket: "immobuy-bbf8d.appspot.com",
  messagingSenderId: "25567642900",
  appId: "1:25567642900:web:66cc7071caeb6fce0bae01",
  measurementId: "G-LXC9ZK52DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
