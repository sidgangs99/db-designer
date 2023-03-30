import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useEdges, useNodes } from 'reactflow';
import { useStore } from 'zustand';
import { MESSAGE_RETRIEVED_WORKBOOK } from './../../common/toast/messages';

import { API_WORKBOOK } from '../../../api/workbook';
import { useAuthStore } from '../../../store/firebase/state';
import { authenticatePutAPI } from '../../../util/api';
import { emojiToast } from '../../common/toast/emoji-toast';
import {
    MESSAGE_RETRIEVING_WORKBOOK,
    MESSAGE_SAVED_WORKBOOK,
    MESSAGE_SAVING_WORKBOOK
} from '../../common/toast/messages';

export function useSaveWorkbook() {
    const nodes: any = useNodes();
    const edges: any = useEdges();

    const [queryCount, setQueryCount] = useState(0);
    const { user }: any = useStore(useAuthStore);

    const { isFetching, refetch } = useQuery<any>(
        'workbook',
        () =>
            authenticatePutAPI(user.accessToken, API_WORKBOOK, {
                nodes,
                edges
            }),
        { enabled: false }
    );

    let savingWorkbookToastId: string;
    useEffect(() => {
        if (isFetching) {
            if (queryCount < 1) {
                savingWorkbookToastId = emojiToast(
                    MESSAGE_RETRIEVING_WORKBOOK,
                    '📚',
                    'bg-yellow-300'
                );
            } else {
                savingWorkbookToastId = emojiToast(
                    MESSAGE_SAVING_WORKBOOK,
                    '📚',
                    'bg-yellow-300'
                );
            }
        } else {
            if (queryCount < 1) {
                emojiToast(MESSAGE_RETRIEVED_WORKBOOK, '📖');
            } else {
                emojiToast(MESSAGE_SAVED_WORKBOOK, '💾');
            }

            setQueryCount(queryCount + 1);
        }
    }, [isFetching]);

    return { refetch };
}
