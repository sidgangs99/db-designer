import { useQuery } from '@tanstack/react-query';

import { API_WORKBOOK } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import { authenticatePostAPI } from '../../../util/axios';

export function useCreateWorkbook() {
    const { user }: any = useAuthStore();

    const { data, isFetching, isError, refetch }: any = useQuery<any>(
        ['create-user-workbooks'],
        () => authenticatePostAPI(user.accessToken, API_WORKBOOK, {}),
        {
            enabled: false
        }
    );

    return { data: data?.data, isFetching, isError, refetch };
}
