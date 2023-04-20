import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';
import { API_WORKBOOK } from '../../api/workbook';

import { Navigate } from 'react-router-dom';
import useAuthStore, { IUseAuthStore } from '../../store/firebase/state';
import useWorkbookStore from '../../store/workbook/state';
import { authenticateGetAPI } from '../../util/axios';
import LoaderComponent from '../common/loader/component';

export const ProtectedRoute = ({ Component }: any) => {
    const { user, setUser, auth }: IUseAuthStore = useAuthStore(
        (state: any) => state
    );

    const { setEdges, setNodes } = useWorkbookStore();
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isFetchingData, setIsFetchingData] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((_user: any) => {
            if (Object.keys(_user || {}).length) {
                setUser(_user);
            }
            setIsAuthenticating(false);
        });
    }, []);

    const { data, refetch, isSuccess } = useQuery<any>(
        'workbook',
        () => authenticateGetAPI(user?.accessToken, API_WORKBOOK),
        { enabled: user?.accessToken ? true : false }
    );

    useEffect(() => {
        if (!isAuthenticating) refetch();
    }, [isAuthenticating]);

    useEffect(() => {
        if (isSuccess) {
            setNodes(data?.data?.nodes || []);
            setEdges(data?.data?.edges || []);
            setIsFetchingData(false);
        }
    }, [isSuccess]);

    return isAuthenticating || isFetchingData ? (
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
