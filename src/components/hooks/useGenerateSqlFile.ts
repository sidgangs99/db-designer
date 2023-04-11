import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useEdges, useNodes } from 'reactflow';

import { API_SQL_GENERATE } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import { authenticatePostAPI } from '../../util/axios';
import { emojiToast } from '../common/toast/emoji-toast';
import { MESSAGE_GENERATE_SQL_FILE } from '../common/toast/messages';

export function useGenerateSqlFile() {
    const nodes: any = useNodes();
    const edges: any = useEdges();
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
