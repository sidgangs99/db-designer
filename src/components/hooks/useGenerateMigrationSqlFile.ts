import { useMutation } from '@tanstack/react-query';

import { API_MIGRATE } from '../../api/workbook';
import useAuthStore from '../../store/firebase/state';
import { authenticateGetAPI } from '../../util/axios';

export function useGenerateMigrationSqlFile(onSuccess: any, onError: any) {
    const { user }: any = useAuthStore();

    const mutateFnc = ({
        migrateFrom,
        migrateTo
    }: {
        migrateFrom: Record<string, any>;
        migrateTo: Record<string, any>;
    }) =>
        authenticateGetAPI(
            user.accessToken,
            API_MIGRATE + '/' + migrateFrom?._id + '/' + migrateTo?._id
        );

    const { data, mutate }: any = useMutation(mutateFnc, {
        onSuccess,
        onError
    });

    return { data: data?.data, mutate };
}
