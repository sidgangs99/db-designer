import debounce from 'lodash/debounce';
import { useMutation } from 'react-query';

import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
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
    const [previousVersionOfNodes, setPreviousVersionOfNodes] = useState([]);
    const [previousVersionOfEdges, setPreviousVersionOfEdges] = useState([]);

    const extractValuesFromNodesAndEdges = () => {
        const _nodes: any = nodes.map((node: any) => ({
            data: node.data,
            position: node.position
        }));
        const _edges: any = edges.map((edge: any) => ({
            source: edge.source,
            target: edge.target
        }));

        return { _nodes, _edges };
    };

    const assignLatestValues = () => {
        const { _nodes, _edges } = extractValuesFromNodesAndEdges();
        setPreviousVersionOfNodes(_nodes);
        setPreviousVersionOfEdges(_edges);
    };

    const { user }: any = useAuthStore();

    const mutateFnc = () => {
        // darkToast({
        //     message: MESSAGE_SAVING_WORKBOOK,
        //     position: 'top-center'
        // });
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

    const onMutateFn = () => {
        assignLatestValues();
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
        onError: onErrorFn,
        onMutate: onMutateFn
    });

    const saveWorkbookDebounce = useRef(debounce(() => mutateAsync({}), 10000));
    const resetDebounceCalls = () => {
        saveWorkbookDebounce.current.cancel();
    };

    const timeoutRef = useRef<any>(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(resetDebounceCalls, 3000);
        return () => clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        const { _nodes, _edges } = extractValuesFromNodesAndEdges();
        if (
            !isEqual(previousVersionOfNodes, _nodes) ||
            !isEqual(previousVersionOfEdges, _edges)
        ) {
            saveWorkbookDebounce.current();
        } else {
            resetDebounceCalls();
        }
    }, [nodes]);
}
