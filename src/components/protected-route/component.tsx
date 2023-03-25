import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { useStore } from 'zustand';

import { chelseaCucumber } from '../../colors';
import { auth, useAuthStore } from '../../store/firebase/state';
import LoaderComponent from '../common/loader/component';

export const ProtectedRoute = ({ Component }: any) => {
    const { user, setUser }: any = useStore(useAuthStore);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((_user: any) => {
            setUser(_user);
            setIsLoading(false);
        });
    }, []);

    return isLoading ? (
        <LoaderComponent
            Component={HashLoader}
            color={chelseaCucumber[500]}
            speedMultiplier={0.4}
        />
    ) : user ? (
        <Component />
    ) : (
        <Navigate
            to={{
                pathname: '/login'
            }}
        />
    );
};
