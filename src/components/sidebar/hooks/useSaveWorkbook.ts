import { useQuery } from 'react-query';
import { useEdges, useNodes } from 'reactflow';
import { useStore } from 'zustand';

import { API_WORKBOOK } from '../../../api/workbook';
import { useAuthStore } from '../../../store/firebase/state';
import { authenticatePutAPI } from '../../../util/api';

export function useSaveWorkbook() {
    const nodes: any = useNodes();
    const edges: any = useEdges();

    const { user }: any = useStore(useAuthStore);

    return useQuery<any>(
        'workbook',
        () =>
            authenticatePutAPI(user.accessToken, API_WORKBOOK, {
                nodes,
                edges
            }),
        { enabled: false }
    );
}
