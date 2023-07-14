import { useMutation } from '@tanstack/react-query';

import { API_SQL_GENERATE } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import useWorkbookStore from '../../store/workbook/state';
import { authenticatePostAPI } from '../../util/axios';

export function useGenerateSqlFile(onSuccess: any, onError: any) {
    const { nodes, edges } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const { mutate }: any = useMutation<any>(
        () =>
            authenticatePostAPI(user.accessToken, API_SQL_GENERATE, {
                nodes,
                edges
            }),
        { onSuccess, onError }
    );

    return { mutate };
}
