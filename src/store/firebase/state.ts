import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { create } from 'zustand';
import { API_USER } from '../../api/auth';
import { API_WORKBOOK } from '../../api/workbook';
import { authenticateGetAPI, axiosInstance } from '../../util/axios';
import { getEnvVariable } from '../../util/helper';
import useWorkbookStore from '../workbook/state';

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
    user: User | undefined;
    setUser: Function;
    loginWithGoogle: Function;
    logout: Function;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
    db,
    auth,
    provider,

    user: undefined,
    setUser: (user: any) => set((state: any) => ({ ...state, user: user })),

    loginWithGoogle: async () => {
        try {
            const { user }: { user: User } = await signInWithPopup(
                auth,
                provider
            );
            await axiosInstance.put(API_USER, user);
            const accessToken = await user.getIdToken();

            // Updating workbook
            const { data }: any = await authenticateGetAPI(
                accessToken,
                API_WORKBOOK
            );
            useWorkbookStore.setState({
                nodes: data.nodes,
                edges: data.edges,
                workbookId: data._id,
                v: data.v
            });

            set((state: any) => ({ ...state, user: user }));
        } catch (error) {
            console.error(error);
        }
    },

    logout: async () => {
        try {
            await signOut(auth);

            // Delete workbook in localhost on logout
            useWorkbookStore.setState({
                nodes: [],
                edges: [],
                workbookId: '',
                v: ''
            });

            set((state: any) => ({ ...state, user: null }));
        } catch (error) {
            console.error(error);
        }
    }
}));

export default useAuthStore;
