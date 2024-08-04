import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de importar AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyBIPLLhGNVZWEEeLbHKU67XcTnWUEDTBRA",
  authDomain: "firstlogin-fc6df.firebaseapp.com",
  databaseURL: "https://firstlogin-fc6df-default-rtdb.firebaseio.com",
  projectId: "firstlogin-fc6df",
  storageBucket: "firstlogin-fc6df.appspot.com",
  messagingSenderId: "199118799947",
  appId: "1:199118799947:web:ea50cc360a995fea95f9ce",
  measurementId: "G-J59Z863TX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
export { auth };
