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
    const {
        nodes,
        edges,
        setOpenSaveWorkbook,
        setEdges,
        setNodes,
        setVersion
    } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const mutationFu = ({
        __v,
        commitMessage
    }: {
        __v: string;
        commitMessage: string;
    }) => {
        return authenticatePutAPI(user.accessToken, API_WORKBOOK, {
            nodes,
            edges,
            __v,
            commitMessage
        });
    };

    const onSuccessFn = ({ data }: any) => {
        const { nodes = [], edges = [], __v } = data || {};
        setEdges(edges), setNodes(nodes), setVersion(__v);

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

    const onSubmit = (data: { __v: string; commitMessage: string }) => {
        setOpenSaveWorkbook(false);
        mutate(data);
    };

    return {
        onSubmit,
        isSuccess
    };
}
