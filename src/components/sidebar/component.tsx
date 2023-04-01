import { useEffect, useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BiSpreadsheet } from 'react-icons/bi';
import { FiCamera, FiSave } from 'react-icons/fi';
import { TbFileExport } from 'react-icons/tb';

import { useStore } from 'zustand';

import { useAuthStore } from '../../store/firebase/state';
import { downloadPngImageOfWorkbook } from '../../util/helper';
import ButtonContainer from '../common/button/container';
import IconButtonContainer from '../common/icon-button/container';
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
                <IconButtonContainer
                    label={'Reset'}
                    Icon={AiOutlineClear}
                    onClick={() => setOpenResetViewModal(true)}
                />
                <IconButtonContainer
                    label={'Table'}
                    Icon={BiSpreadsheet}
                    onDragStart={(event: any) => onDragStart(event, 'Table')}
                    draggable
                    buttonClassName={'cursor-move'}
                />
                <div className="flex space-x-4">
                    <IconButtonContainer
                        label={'Snapshot'}
                        Icon={FiCamera}
                        onClick={() => downloadPngImageOfWorkbook()}
                    />
                    <IconButtonContainer
                        label={'Export'}
                        Icon={TbFileExport}
                        onClick={() => fetchGenerateSqlFile()}
                    />
                    <IconButtonContainer
                        label={'Save'}
                        Icon={FiSave}
                        onClick={() => fetchSaveWorkbook()}
                    />

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
