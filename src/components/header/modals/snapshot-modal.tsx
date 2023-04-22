import { useState } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import { HashLoader } from 'react-spinners';
import { SNAPSHOTS } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import useWorkbookStore from '../../../store/workbook/state';
import { authenticateGetAPI } from '../../../util/axios';
import { getReadableDateTime } from '../../../util/helper';
import LoaderComponent from '../../common/loader/component';
import ModalContainer from '../../common/modal/container';

interface ISnapshotModal {
    open: boolean;
    setOpen: any;
}

export default function SnapshotModalComponent(props: ISnapshotModal) {
    const { open, setOpen } = props;
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    const { workbookId } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const { data, isFetching }: QueryObserverResult = useQuery(
        'previous-snapshots',
        () => authenticateGetAPI(user.accessToken, SNAPSHOTS + '/' + workbookId)
    );

    const { data: snapshots }: any = data || [];

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'w-1/3'}
            Header={
                <div className="flex whitespace-nowrap">Pervious Snapshots</div>
            }
            Body={
                isFetching ? (
                    <LoaderComponent
                        Component={HashLoader}
                        speedMultiplier={0.4}
                    />
                ) : (
                    <div className="flex flex-col items-start justify-center space-y-4">
                        {snapshots.map((snapshot: any) => (
                            <>
                                <div className="flex items-start justify-center space-x-4">
                                    <div>version ( {snapshot?.version} )</div>
                                    <div>-</div>
                                    <div>
                                        {getReadableDateTime(
                                            snapshot?.createdAt
                                        )}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                )
            }
            Footer={<></>}
        />
    );
}
