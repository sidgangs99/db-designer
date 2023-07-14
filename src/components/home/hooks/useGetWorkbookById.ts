import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { API_WORKBOOK } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import useWorkbookStore from '../../../store/workbook/state';
import { authenticateGetAPI } from '../../../util/axios';

export function useGetWorkbookById() {
    const { user }: any = useAuthStore();
    const { setEdges, setNodes, setVersion, setWorkbookId, setWorkbookSynced } =
        useWorkbookStore();

    const [pathnameWorkbookId, setPathnameWorkbookId] = useState('');

    const { data, isFetching, isError, refetch, error }: any = useQuery<any>(
        ['get-user-workbook-by-id', pathnameWorkbookId],
        () =>
            authenticateGetAPI(
                user.accessToken,
                API_WORKBOOK + '/' + pathnameWorkbookId
            ),
        { enabled: pathnameWorkbookId?.length > 0 }
    );

    useEffect(() => {
        if (data?.data) {
            const { nodes, edges, _id, v } = data?.data;
            setEdges(edges);
            setNodes(nodes);
            setVersion(v);
            setWorkbookId(_id);
            setWorkbookSynced(true);
        }
    }, [data]);

    return {
        data: data?.data,
        isFetching,
        isError,
        refetch,
        error: error?.response?.data,
        pathnameWorkbookId,
        setPathnameWorkbookId
    };
}
