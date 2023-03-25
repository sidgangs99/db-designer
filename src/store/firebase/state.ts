import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    where
} from 'firebase/firestore';
import { createStore } from 'zustand';

const firebaseConfig = {
    apiKey: 'AIzaSyDLYUArKcbfDSZJbBdX9iy78-3s_vtCvrI',
    authDomain: 'db-designer-381205.firebaseapp.com',
    projectId: 'db-designer-381205',
    storageBucket: 'db-designer-381205.appspot.com',
    messagingSenderId: '1092126992824',
    appId: '1:1092126992824:web:28341e739760f40ff2874d',
    measurementId: 'G-CH1WGSYYNP'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const useAuthStore = createStore((set) => ({
    db,
    auth,
    provider,

    user: null,
    setUser: (user: any) => set((state: any) => ({ ...state, user: user })),

    loginWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const { uid, displayName, email, photoURL } = result.user;

            // Check if the user exists in the users collection
            const q = query(collection(db, 'users'), where('uid', '==', uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, 'users'), {
                    uid: uid,
                    name: displayName,
                    authProvider: 'google',
                    email: email,
                    photoURL: photoURL
                });
            }
            console.log(result.user);
            set((state: any) => ({ ...state, user: result.user }));
        } catch (error) {
            console.error(error);
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            set((state: any) => ({ ...state, user: null }));
        } catch (error) {
            console.error(error);
        }
    }
}));

