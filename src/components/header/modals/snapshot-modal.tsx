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

    const { data, isFetching, isError }: QueryObserverResult = useQuery(
        'previous-snapshots',
        () => authenticateGetAPI(user.accessToken, SNAPSHOTS + '/' + workbookId)
    );

    const { data: snapshots }: any = data || [];

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'w-2/3'}
            Header={
                <div className="flex whitespace-nowrap">Pervious Snapshots</div>
            }
            Body={
                isFetching ? (
                    <LoaderComponent
                        Component={HashLoader}
                        speedMultiplier={0.4}
                    />
                ) : isError || snapshots.length === 0 ? (
                    <div className="flex flex-col items-start justify-center space-y-4">
                        No Previous Snapshots found
                    </div>
                ) : (
                    <div className="flex max-h-96 flex-col items-start justify-center space-y-4 overflow-y-scroll">
                        {snapshots.map(
                            ({ version, createdAt }: any, index: number) => (
                                <>
                                    <div className="flex items-start justify-center space-x-4">
                                        {index === 0 ? (
                                            <div>current</div>
                                        ) : (
                                            <div>version ( {version} )</div>
                                        )}
                                        <div>-</div>
                                        <div>
                                            {getReadableDateTime(createdAt)}
                                        </div>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                )
            }
            Footer={<></>}
        />
    );
}
