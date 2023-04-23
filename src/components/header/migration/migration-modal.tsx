import { MdOutlineDifference } from 'react-icons/md';
import { useQuery } from 'react-query';
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
}

export default function MigrateModalComponent(props: IMigrateModal) {
    const { open, setOpen } = props;

    const { workbookId } = useWorkbookStore();
    const { user }: any = useAuthStore();

    const [snapshots, setSnapshots] = useState([]);
    const [migrateFrom, setMigrateFrom] = useState({});
    const [migrateTo, setMigrateTo] = useState([]);
    const { data: responseData, isFetching }: any = useQuery(
        `get-snapshots`,
        () =>
            authenticateGetAPI(
                user.accessToken,
                API_SNAPSHOTS + '/' + workbookId
            )
    );

    const { data = [] }: any = responseData || {};

    useEffect(() => {
        setSnapshots(data);
        if (data.length > 1) {
            setMigrateTo(data?.[0]);
            setMigrateFrom(data?.[1]);
        }
    }, [responseData]);

    const getLabel = (value: any) =>
        `v ( ${value?.v} ) - ${value?.commitMessage}`;

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'w-2/3'}
            Header={
                <div className="flex items-center justify-between">
                    <div className="flex whitespace-nowrap text-gray-300">
                        Select versions in which you want to migrate
                    </div>
                    {snapshots.length > 1 && (
                        <IconButtonContainer
                            label={'Migrate'}
                            Icon={MdOutlineDifference}
                            type={'submit'}
                            form={'migrate'}
                        />
                    )}
                </div>
            }
            Body={
                isFetching ? (
                    <LoaderComponent
                        Component={HashLoader}
                        speedMultiplier={0.4}
                        className="bg-transparent"
                    />
                ) : snapshots.length > 1 ? (
                    <div className="my-6 flex flex-col justify-center space-y-6">
                        <div className="flex items-center space-x-4">
                            <label className="flex w-1/12  items-center justify-start">
                                Migrate To :
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
                                Migrate From :
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
                    </div>
                ) : (
                    <div className="text-2xl text-grey-lighter">
                        Create at least two versions of your schema to enable
                        this
                    </div>
                )
            }
            Footer={<></>}
        />
    );
}
