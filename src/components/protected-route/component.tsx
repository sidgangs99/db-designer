import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

import { Navigate } from 'react-router-dom';
import useAuthStore, { IUseAuthStore } from '../../store/firebase/state';
import LoaderComponent from '../common/loader/component';

export const ProtectedRoute = ({ Component }: any) => {
    const { user, setUser, auth }: IUseAuthStore = useAuthStore(
        (state: any) => state
    );

    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((_user: any) => {
            if (Object.keys(_user || {}).length) {
                setUser(_user);
            }
            setIsAuthenticating(false);
        });
    }, []);

    return isAuthenticating ? (
        <LoaderComponent
            Component={HashLoader}
            // color={chelseaCucumber[500]}
            speedMultiplier={0.4}
        />
    ) : user ? (
        <Component />
    ) : (
        <Navigate
            to={{
                pathname: '/'
            }}
        />
    );
};
