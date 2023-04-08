import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useEdges, useNodes } from 'reactflow';
import { MESSAGE_RETRIEVED_WORKBOOK } from '../../common/toast/messages';

import { API_WORKBOOK } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import { useWorkbook } from '../../../store/workbook/state';
import { authenticatePutAPI } from '../../../util/axios';
import { emojiToast } from '../../common/toast/emoji-toast';
import {
    MESSAGE_RETRIEVING_WORKBOOK,
    MESSAGE_SAVED_WORKBOOK,
    MESSAGE_SAVING_WORKBOOK
} from '../../common/toast/messages';

export function useSaveWorkbook() {
    const nodes: any = useNodes();
    const edges: any = useEdges();

    const { saveWorkbookQueryCount, incrementSaveWorkbookQueryCount }: any =
        useWorkbook();
    const { user }: any = useAuthStore();

    const { isFetching, refetch, isSuccess } = useQuery<any>(
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
            if (saveWorkbookQueryCount < 1) {
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
        } else if (isSuccess) {
            if (saveWorkbookQueryCount < 1) {
                emojiToast(MESSAGE_RETRIEVED_WORKBOOK, '📖');
            } else {
                emojiToast(MESSAGE_SAVED_WORKBOOK, '💾');
            }

            incrementSaveWorkbookQueryCount();
        }
    }, [isFetching]);

    return { refetch };
}
