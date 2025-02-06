import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

// Firebase Config (Replace with your own Firebase config from Firebase Console)
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
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

// Save Job Data to Firestore under the authenticated user
export const saveJobData = async (user, jobData) => {
    if (!user) {
        return { error: "User is not authenticated" };
    }

    try {
        const db = getFirestore();
        const userJobsRef = collection(db, "users", user.uid, "jobs"); // Subcollection for each user

        await addDoc(userJobsRef, {
            date: jobData.date,
            company: jobData.company,
            jobTitle: jobData["job-title"],
            location: jobData.location,
            description: jobData.description,
            savedAt: new Date(),
        });

        return { success: true };
    } catch (error) {
        console.error("Error saving job data:", error);
        return { error: error.message };
    }
};

