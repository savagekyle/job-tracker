import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc } from "firebase/firestore";

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
    if (!user || !user.uid) {
        console.error("❌ Error: User is not authenticated or user.uid is undefined", user);
        return { error: "User is not authenticated" };
    }

    try {
        console.log("✅ Saving job data for user:", user.uid);
        console.log("📌 Job Data:", jobData);

        const db = getFirestore();
        const userJobsRef = collection(db, "users", user.uid, "jobs");

        await addDoc(userJobsRef, {
            date: jobData.date || null,
            company: jobData.company || "Unknown",
            jobTitle: jobData["job-title"] || "Unknown",
            location: jobData.location || "Unknown",
            description: jobData.description || "No description available",
            pay: jobData.pay || "Not provided",
            url: jobData.url || "No URL",
            savedAt: new Date(),
        });

        console.log("✅ Job successfully saved!");
        return { success: true };
    } catch (error) {
        console.error("❌ Error saving job data:", error);
        return { error: error.message };
    }
};


export const getUserJobs = async () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.error("No user is logged in");
                unsubscribe();
                return resolve([]); // Return empty array instead of throwing an error
            }

            try {
                const jobsRef = collection(db, "users", user.uid, "jobs");
                const q = query(jobsRef, orderBy("savedAt", "desc")); // Order by most recent

                const querySnapshot = await getDocs(q);
                let jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                console.log("Fetched jobs:", jobs);
                resolve(jobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                reject(new Error("Error fetching jobs: " + error.message));
            } finally {
                unsubscribe();
            }
        });
    });
};

export const deleteJob = async (jobId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.uid) {
        console.error("❌ Error: User is not authenticated or user.uid is undefined", user);
        return { error: "User is not authenticated" };
    }

    try {
        console.log(`🗑️ Deleting job with ID: ${jobId} for user: ${user.uid}`);

        const jobRef = doc(db, "users", user.uid, "jobs", jobId);
        await deleteDoc(jobRef);

        console.log("✅ Job successfully deleted!");
        return { success: true };
    } catch (error) {
        console.error("❌ Error deleting job:", error);
        return { error: error.message };
    }
};

