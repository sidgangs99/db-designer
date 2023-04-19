import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { API_FAST_API_MODAL_GENERATE } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import useWorkbookStore from '../../store/workbook/state';
import { authenticatePostAPI } from '../../util/axios';
import { emojiToast } from '../common/toast/emoji-toast';
import { MESSAGE_GENERATE_SQL_FILE } from '../common/toast/messages';

export function useGenerateFastApiModal() {
    const { nodes, edges } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const { data, isFetching, isError } = useQuery<any>('fast-api-modal-generator', () =>
        authenticatePostAPI(user.accessToken, API_FAST_API_MODAL_GENERATE, {
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
