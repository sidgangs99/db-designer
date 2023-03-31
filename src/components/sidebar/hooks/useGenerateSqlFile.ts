import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useEdges, useNodes } from 'reactflow';
import { useStore } from 'zustand';

import { API_SQL_GENERATE } from '../../../api/workbook';
import { useAuthStore } from '../../../store/firebase/state';
import { authenticatePostAPI } from '../../../util/api';
import { emojiToast } from '../../common/toast/emoji-toast';
import { MESSAGE_GENERATE_SQL_FILE } from '../../common/toast/messages';

export function useGenerateSqlFile() {
    const nodes: any = useNodes();
    const edges: any = useEdges();
    const { user }: any = useStore(useAuthStore);

    const { data, refetch, isFetching } = useQuery<any>(
        'sql-generator',
        () =>
            authenticatePostAPI(user.accessToken, API_SQL_GENERATE, {
                nodes,
                edges
            }),
        { enabled: false }
    );

    useEffect(() => {
        if (isFetching) emojiToast(MESSAGE_GENERATE_SQL_FILE, '🔨');
        if (!isFetching && data) console.log();
    }, [data, isFetching]);

    return { data: data?.data, refetch, isFetching };
}
