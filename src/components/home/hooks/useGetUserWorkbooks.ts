import { useQuery } from 'react-query';

import { useEffect, useState } from 'react';
import { API_WORKBOOK } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import { authenticateGetAPI } from '../../../util/axios';
import { getReadableDateTime } from '../../../util/helper';

export function useGetUserWorkbooks() {
    const [tableData, setTableData] = useState([]);

    const { user }: any = useAuthStore();

    const { data, isFetching, isError }: any = useQuery<any>(
        'get-all-user-workbooks',
        () => authenticateGetAPI(user.accessToken, API_WORKBOOK)
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
