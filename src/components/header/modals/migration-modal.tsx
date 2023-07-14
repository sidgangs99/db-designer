import { useQuery } from '@tanstack/react-query';
import { MdOutlineDifference } from 'react-icons/md';
import { HashLoader } from 'react-spinners';

import { useEffect, useState } from 'react';
import { API_SNAPSHOTS } from '../../../api/workbook';
import useAuthStore from '../../../store/firebase/state';
import useWorkbookStore from '../../../store/workbook/state';
import { authenticateGetAPI } from '../../../util/axios';
import IconButtonContainer from '../../common/icon-button/container';
import LoaderComponent from '../../common/loader/component';
import ModalContainer from '../../common/modal/container';
import SingleSelectDropdownComponent from '../../common/single-select-dropdown/component';

interface IMigrateModal {
    open: boolean;
    setOpen: any;
    isSuccess: boolean;
    mutate: any;
}

export default function MigrateModalComponent(props: IMigrateModal) {
    const { open, setOpen, mutate } = props;

    const { workbookId, workbookSynced } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const [snapshots, setSnapshots] = useState([]);
    const [migrateFrom, setMigrateFrom] = useState<any>({});
    const [migrateTo, setMigrateTo] = useState<any>({});
    const { data: responseData, isFetching }: any = useQuery(
        [`get-snapshots`],
        () =>
            authenticateGetAPI(
                user.accessToken,
                API_SNAPSHOTS + '/' + workbookId
            )
    );

    const { data = [] }: any = responseData || {};

    useEffect(() => {
        setSnapshots(data);
        if (data) {
            setMigrateTo(data?.[0]);
            setMigrateFrom(data?.[1] || data?.[0]);
        }
    }, [responseData]);

    const getLabel = (value: any) =>
        `v ( ${value?.v} ) - ${value?.commitMessage}`;

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'h-2/4 w-2/3'}
            Header={
                <div className="flex items-center justify-between">
                    <div className="flex whitespace-nowrap text-gray-300">
                        Select versions for diff
                    </div>
                    <IconButtonContainer
                        label={'Diff'}
                        Icon={MdOutlineDifference}
                        type={'submit'}
                        form={'migrate'}
                        onClick={() => {
                            mutate({ migrateFrom, migrateTo });
                        }}
                    />
                </div>
            }
            Body={
                isFetching ? (
                    <LoaderComponent
                        Component={HashLoader}
                        speedMultiplier={0.4}
                        className="bg-transparent"
                    />
                ) : (
                    <div className="my-6 flex flex-col justify-center space-y-6">
                        <div className="flex items-center space-x-4">
                            <label className="flex w-1/12  items-center justify-start">
                                Target :
                            </label>
                            <div className="flex w-7/12">
                                <SingleSelectDropdownComponent
                                    values={snapshots}
                                    value={migrateTo}
                                    setValue={setMigrateTo}
                                    getLabel={getLabel}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="flex w-1/12 items-center justify-start">
                                Source :
                            </label>
                            <div className="flex w-7/12">
                                <SingleSelectDropdownComponent
                                    values={snapshots}
                                    value={migrateFrom}
                                    setValue={setMigrateFrom}
                                    getLabel={getLabel}
                                />
                            </div>
                        </div>
                        {!workbookSynced && (
                            <div className="text-grey-lighter">
                                Note: The current changes are not saved, please
                                save it if you are comparing it.
                            </div>
                        )}
                    </div>
                )
            }
            Footer={<></>}
        />
    );
}
