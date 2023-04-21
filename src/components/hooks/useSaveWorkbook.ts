import { useMutation } from 'react-query';

import { API_WORKBOOK } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import useWorkbookStore from '../../store/workbook/state';
import { authenticatePutAPI } from '../../util/axios';
import { emojiToast } from '../common/toast/emoji-toast';
import {
    MESSAGE_ERROR_SAVING_WORKBOOK,
    MESSAGE_SAVED_WORKBOOK
} from '../common/toast/messages';
import { darkToast } from '../common/toast/toast';

export function useSaveWorkbook() {
    const { nodes, edges } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const mutateFnc = () => {
        return authenticatePutAPI(user.accessToken, API_WORKBOOK, {
            nodes,
            edges
        });
    };

    const onSuccessFn = (data: any, variables: any, context: any) => {
        darkToast({
            message: MESSAGE_SAVED_WORKBOOK,
            position: 'top-center'
        });
    };

    const onErrorFn = (data: any, variables: any, context: any) => {
        emojiToast({
            message: MESSAGE_ERROR_SAVING_WORKBOOK,
            emoji: '❌',
            position: 'top-center'
        });
    };

    const { mutateAsync } = useMutation(mutateFnc, {
        onSuccess: onSuccessFn,
        onError: onErrorFn
    });

    return { saveWorkbook: mutateAsync };
}
