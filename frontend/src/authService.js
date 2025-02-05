import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase Config (Replace with your own Firebase config from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyDGCEwMmptTLDV0nDvvJc8Na5yOCMMf50c",
    authDomain: "job-tracker-726dc.firebaseapp.com",
    projectId: "job-tracker-726dc",
    storageBucket: "job-tracker-726dc.appspot.com",
    messagingSenderId: "980961754839",
    appId: "1:980961754839:web:248ef0e45c217628d2fa92",
    measurementId: "G-E5VYR4JYNF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to Register a User
export const registerUser = async (firstName, lastName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user info in Firestore
        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            userId: user.uid,
            createdAt: new Date()
        });

        return { user };
    } catch (error) {
        return { error: error.message };
    }
};

// Function to Log In a User
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { user };
    } catch (error) {
        return { error: error.message };
    }
};

// Function to Log Out a User
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};
