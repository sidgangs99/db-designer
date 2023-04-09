import debounce from 'lodash/debounce';
import { useMutation } from 'react-query';
import { useEdges, useNodes } from 'reactflow';

import { useCallback, useRef } from 'react';
import { API_WORKBOOK } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import { authenticatePutAPI } from '../../../util/axios';
import { emojiToast } from '../../common/toast/emoji-toast';
import {
    MESSAGE_SAVED_WORKBOOK,
    MESSAGE_SAVING_WORKBOOK
} from '../../common/toast/messages';

export function useSaveWorkbook() {
    const nodes: any = useNodes();
    const edges: any = useEdges();

    const { user }: any = useAuthStore();

    const mutateFn = useMutation({
        mutationFn: () => {
            emojiToast({
                message: MESSAGE_SAVING_WORKBOOK,
                emoji: '📚',
                className: 'bg-grey-darker text-black',
                position: 'top-center'
            });
            return authenticatePutAPI(user.accessToken, API_WORKBOOK, {
                nodes,
                edges
            });
        },
        onSuccess(data, variables, context) {
            emojiToast({
                message: MESSAGE_SAVED_WORKBOOK,
                emoji: '💾',
                position: 'top-center',
                className: 'bg-grey-darker text-black'
            });
        }
    });

    const saveWorkbookDebounce = useRef(debounce(mutateFn.mutate, 2000));

    // useEffect(() => {
    //     console.log(saveWorkbookDebounce.current);
    // }, [saveWorkbookDebounce.current]);

    const saveWorkbook = useCallback(() => {
        saveWorkbookDebounce.current.cancel();
        return mutateFn.mutate();
    }, [saveWorkbookDebounce, mutateFn]);

    return { saveWorkbookDebounce: saveWorkbookDebounce.current, saveWorkbook };
}
