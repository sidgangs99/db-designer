import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { API_WORKBOOK } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import { authenticateGetAPI } from '../../../util/axios';
import { getReadableDateTime } from '../../../util/helper';

export function useGetUserWorkbooks() {
    const location = useLocation();

    const { user }: any = useAuthStore();

    const [tableData, setTableData] = useState([]);

    const { data, isFetching, isError }: any = useQuery<any>(
        ['get-all-user-workbooks'],
        () => authenticateGetAPI(user.accessToken, API_WORKBOOK),
        { enabled: location.pathname === '/design', retry: 0 }
    );

    useEffect(() => {
        if (data) {
            const formatData = data?.data.map((d: any) => ({
                ...d,
                createdAt: getReadableDateTime(d.createdAt),
                updatedAt: getReadableDateTime(d.updatedAt)
            }));

            setTableData(formatData);
        }
    }, [data]);

    return { data: data?.data, isFetching, isError, tableData };
}
