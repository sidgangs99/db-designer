import { useMutation } from '@tanstack/react-query';

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
    const {
        nodes,
        edges,
        workbookId,
        setVersion,
        setOpenSaveWorkbook,
        setWorkbookSynced
    } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const mutationFu = (data?: any) => {
        return authenticatePutAPI(user.accessToken, API_WORKBOOK, {
            nodes,
            edges,
            workbookId,
            ...data
        });
    };

    const onSuccessFn = ({ data }: any) => {
        const { nodes = [], edges = [], v } = data || {};
        setWorkbookSynced(true);

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

    const { mutate, isSuccess } = useMutation((data) => mutationFu(data), {
        onSuccess: onSuccessFn,
        onError: onErrorFn
    });

    const onSubmit = () => {
        setOpenSaveWorkbook(false);
        mutate({});
    };

    const onVersionUpdate = (data: { v: string; commitMessage: string }) => {
        setVersion(data.v);
        mutate(data);
    };

    return {
        onSubmit,
        isSuccess,
        onVersionUpdate
    };
}
