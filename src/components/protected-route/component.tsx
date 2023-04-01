import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { useStore } from 'zustand';
import { API_WORKBOOK } from '../../api/workbook';

import { useEdgesStore } from '../../store/edges/state';
import { auth, useAuthStore } from '../../store/firebase/state';
import { useNodesStore } from '../../store/nodes/state';
import { authenticateGetAPI } from '../../util/api';
import LoaderComponent from '../common/loader/component';

export const ProtectedRoute = ({ Component }: any) => {
    const { user, setUser }: any = useStore(useAuthStore);
    const { setNodes }: any = useStore(useNodesStore);
    const { setEdges }: any = useStore(useEdgesStore);

    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingData, setIsFetchingData] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((_user: any) => {
            setUser(_user);
            setIsLoading(false);
        });
    }, []);

    const { user: userZus }: any = useStore(useAuthStore);
    const { data, refetch } = useQuery<any>(
        'workbook',
        () => authenticateGetAPI(userZus?.accessToken, API_WORKBOOK),
        { enabled: userZus?.accessToken ? true : false }
    );

    useEffect(() => {
        if (!isLoading) refetch();
    }, [isLoading]);

    useEffect(() => {
        if (data?.data) {
            setNodes(data?.data?.nodes || []);
            setEdges(data?.data?.edges || []);
            setIsFetchingData(false);
        }
    }, [data]);

    return isLoading || isFetchingData ? (
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
                pathname: '/login'
            }}
        />
    );
};
