// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore,doc, getDoc,setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKcHlpCuZ-0IlF8LvlxqgiCIbRZ0ocqxQ",
  authDomain: "ecommerce-web-c8491.firebaseapp.com",
  projectId: "ecommerce-web-c8491",
  storageBucket: "ecommerce-web-c8491.firebasestorage.app",
  messagingSenderId: "562072523661",
  appId: "1:562072523661:web:8fe01338744e3625a863c4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:'select_account'
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) =>{
    const userDocRef = doc(db, 'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log("snapshot: ", userSnapshot)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.error("error creating the user: ", error.message);
        }
    }else{
        console.log("user already created")
    }
}