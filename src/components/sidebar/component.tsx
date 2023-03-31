import { useEffect, useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BiSpreadsheet } from 'react-icons/bi';
import { BsFiletypeSql } from 'react-icons/bs';
import { TfiSave } from 'react-icons/tfi';
import { Tooltip } from 'react-tooltip';

import { useStore } from 'zustand';

import { useAuthStore } from '../../store/firebase/state';
import ButtonContainer from '../common/button/container';
import DownloadButton from '../common/downloadHTML/component';
import { useGenerateSqlFile } from './hooks/useGenerateSqlFile';
import { useSaveWorkbook } from './hooks/useSaveWorkbook';
import DownloadSqlFileModal from './modals/download-sql';
import ResetViewModal from './modals/reset-view';

import { ISidebarComponentProps } from './types';

const SidebarComponent = (props: ISidebarComponentProps) => {
    const { onDragStart } = props;

    const { logout }: any = useStore(useAuthStore);
    const [openResetViewModal, setOpenResetViewModal] = useState(false);
    const [openDownloadSqlFileModal, setOpenDownloadSqlFileModal] =
        useState(false);

    const { refetch: fetchSaveWorkbook } = useSaveWorkbook();
    const {
        refetch: fetchGenerateSqlFile,
        data: sqlFileData,
        isFetching: isGenerateSqlFileFetching
    } = useGenerateSqlFile();

    useEffect(() => {
        if (isGenerateSqlFileFetching) setOpenDownloadSqlFileModal(true);
    }, [isGenerateSqlFileFetching]);

    useEffect(() => {
        console.log(openDownloadSqlFileModal);
    }, [openDownloadSqlFileModal]);

    return (
        <>
            <div className="flex w-full items-center justify-between px-6">
                <div className="flex space-x-4">
                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onClick={() => setOpenResetViewModal(true)}
                        data-tooltip-id={`reset-workbook-icon-header`}
                        data-tooltip-content={'Reset workbook'}
                    >
                        <AiOutlineClear className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                        <Tooltip
                            id={`reset-workbook-icon-header`}
                            place="bottom"
                            className="flex w-40 items-center justify-center bg-chelsea-cucumber-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <div
                        className="cursor-move rounded-lg border border-chelsea-cucumber-200 bg-white hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onDragStart={(event) => onDragStart(event, 'Table')}
                        draggable
                        data-tooltip-id={`table-icon-header`}
                        data-tooltip-content={'Drag me and create a new table'}
                    >
                        <BiSpreadsheet className="m-0.5 fill-chelsea-cucumber-700 text-2xl" />
                        <Tooltip
                            id={`table-icon-header`}
                            place="bottom"
                            className="flex w-40 items-center justify-center bg-chelsea-cucumber-500"
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        data-tooltip-id={`screenshot-icon-header`}
                        data-tooltip-content={'Save a snapshot of workbook'}
                    >
                        <DownloadButton />
                        <Tooltip
                            id={`screenshot-icon-header`}
                            place="bottom"
                            className="flex w-40 items-center justify-center bg-chelsea-cucumber-500"
                        />
                    </div>
                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white  hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onClick={(e: any) => {
                            fetchGenerateSqlFile();
                        }}
                        data-tooltip-id={`sql-download-icon-header`}
                        data-tooltip-content={'Generate and save .sql file'}
                    >
                        <BsFiletypeSql className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                        <Tooltip
                            id={`sql-download-icon-header`}
                            place="bottom"
                            className="flex w-40 items-center justify-center bg-chelsea-cucumber-500"
                        />
                    </div>

                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onClick={(e: any) => {
                            fetchSaveWorkbook();
                        }}
                        data-tooltip-id={`save-workbook-icon-header`}
                        data-tooltip-content={'Save your workbook'}
                    >
                        <TfiSave className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                        <Tooltip
                            id={`save-workbook-icon-header`}
                            place="bottom"
                            className="flex w-40 items-center justify-center bg-chelsea-cucumber-500"
                        />
                    </div>
                    <ButtonContainer label="Logout" onClick={() => logout()} />
                </div>
            </div>
            {openResetViewModal && (
                <ResetViewModal
                    open={openResetViewModal}
                    setOpen={setOpenResetViewModal}
                />
            )}
            {openDownloadSqlFileModal && (
                <DownloadSqlFileModal
                    open={openDownloadSqlFileModal}
                    setOpen={setOpenDownloadSqlFileModal}
                    data={sqlFileData}
                />
            )}
        </>
    );
};

export default SidebarComponent;
