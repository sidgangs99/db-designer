import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { API_SQL_GENERATE } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import useWorkbookStore from '../../store/workbook/state';
import { authenticatePostAPI } from '../../util/axios';
import { emojiToast } from '../common/toast/emoji-toast';
import { MESSAGE_GENERATE_SQL_FILE } from '../common/toast/messages';

export function useGenerateSqlFile() {
    const { nodes, edges } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const { data, isFetching, isError } = useQuery<any>('sql-generator', () =>
        authenticatePostAPI(user.accessToken, API_SQL_GENERATE, {
            nodes,
            edges
        })
    );

    useEffect(() => {
        if (isFetching)
            emojiToast({ message: MESSAGE_GENERATE_SQL_FILE, emoji: '🔨' });
    }, [isFetching]);

    return { data: data?.data, isFetching, isError };
}
