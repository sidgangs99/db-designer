import { saveAs } from 'file-saver';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNodes } from 'reactflow';
import { useStore } from 'zustand';

import { API_SQL_GENERATE } from '../../../api/workbook';
import { useAuthStore } from '../../../store/firebase/state';
import { authenticatePostAPI } from '../../../util/api';
import { emojiToast } from '../../common/toast/emoji-toast';
import { MESSAGE_GENERATE_SQL_FILE } from '../../common/toast/messages';

function saveSQLFile(fileContent: string) {
    const sqlBlob = new Blob([fileContent], { type: 'text/sql' });
    saveAs(sqlBlob, 'dbDesignerSchema.sql');
}

export function useDownloadSqlFile() {
    const nodes: any = useNodes();
    const { user }: any = useStore(useAuthStore);

    const { data, isFetching, refetch } = useQuery<any>(
        'sql-generator',
        () =>
            authenticatePostAPI(user.accessToken, API_SQL_GENERATE, {
                nodes
            }),
        { enabled: false }
    );

    useEffect(() => {
        if (isFetching) emojiToast(MESSAGE_GENERATE_SQL_FILE, '🔨');
        if (!isFetching && data) saveSQLFile(data.data.fileContent);
    }, [data, isFetching]);

    return { refetch };
}
