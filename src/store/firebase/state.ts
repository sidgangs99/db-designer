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
import { create } from 'zustand';
import { getEnvVariable } from '../../util/helper';

const firebaseConfig = {
    apiKey: getEnvVariable('VITE_FIRESTORE_API_KEY'),
    authDomain: getEnvVariable('VITE_FIRESTORE_AUTH_DOMAIN'),
    projectId: getEnvVariable('VITE_FIRESTORE_PROJECT_ID'),
    storageBucket: getEnvVariable('VITE_FIRESTORE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVariable('VITE_FIRESTORE_MESSEGING_SENDER_FILE'),
    appId: getEnvVariable('VITE_FIRESTORE_APP_ID'),
    measurementId: getEnvVariable('VITE_FIRESTORE_MEASUREMENT_ID')
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export interface IUseAuthStore {
    db: any;
    auth: any;
    provider: any;
    user: any;
    setUser: Function;
    loginWithGoogle: Function;
    logout: Function;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
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

export default useAuthStore;