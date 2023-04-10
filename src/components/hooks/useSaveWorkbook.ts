import debounce from 'lodash/debounce';
import { useMutation } from 'react-query';
import { useEdges, useNodes } from 'reactflow';

import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { API_WORKBOOK } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import { authenticatePutAPI } from '../../util/axios';
import { emojiToast } from '../common/toast/emoji-toast';
import {
    MESSAGE_ERROR_SAVING_WORKBOOK,
    MESSAGE_SAVED_WORKBOOK,
    MESSAGE_SAVING_WORKBOOK
} from '../common/toast/messages';

export function useSaveWorkbook() {
    const nodes: any = useNodes();
    const edges: any = useEdges();

    const [previousVersionOfNodes, setPreviousVersionOfNodes] = useState([]);
    const [previousVersionOfEdges, setPreviousVersionOfEdges] = useState([]);

    const extractValuesFromNodesAndEdges = () => {
        const _nodes = nodes.map((node: any) => ({
            data: node.data,
            position: node.position
        }));
        const _edges = edges.map((edge: any) => ({
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
        emojiToast({
            message: MESSAGE_SAVING_WORKBOOK,
            emoji: '📚',
            position: 'bottom-right'
        });
        return authenticatePutAPI(user.accessToken, API_WORKBOOK, {
            nodes,
            edges
        });
    };

    const onSuccessFn = (data: any, variables: any, context: any) => {
        emojiToast({
            message: MESSAGE_SAVED_WORKBOOK,
            emoji: '💾',
            position: 'bottom-right'
        });
    };

    const onMutateFn = () => {
        assignLatestValues();
    };

    const onErrorFn = (data: any, variables: any, context: any) => {
        emojiToast({
            message: MESSAGE_ERROR_SAVING_WORKBOOK,
            emoji: '❌',
            position: 'bottom-right'
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
