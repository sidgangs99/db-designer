import { useEffect, useState } from 'react';

import {
    FAST_API_DATA_MODAL_OPTION,
    SNAPSHOT_OPTION,
    SQL_FILE_OPTION,
    UPCOMING_OPTION
} from '../../constants/export.constants';
import { downloadPngImageOfWorkbook } from '../../util/helper';

import useAuthStore from '../../store/firebase/state';
import useWorkbookStore, { IWorkbookStore } from '../../store/workbook/state';
import { useGenerateMigrationSqlFile } from '../hooks/useGenerateMigrationSqlFile';
import { useGenerateSqlFile } from '../hooks/useGenerateSqlFile';
import { useSaveWorkbook } from '../hooks/useSaveWorkbook';
import HeaderComponent from './component';
import CommitWorkbookModalComponent from './modals/commit-workbook-modal';
import DownloadFastApiModal from './modals/download-fast-api-modal';
import DownloadSqlFileModal from './modals/download-sql';
import MigrateModalComponent from './modals/migration-modal';
import ProfileViewModal from './modals/profile';
import ResetViewModal from './modals/reset-view';
import { IHeaderContainerProps } from './types';

export default function HeaderContainer(props: IHeaderContainerProps) {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { user, logout }: any = useAuthStore();
    const { setOpenSaveWorkbook, workbookSynced }: IWorkbookStore =
        useWorkbookStore();

    const [openResetViewModal, setOpenResetViewModal] = useState(false);
    const [openMigrationModal, setOpenMigrationModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openSaveNewVersionModal, setOpenSaveNewVersionModal] =
        useState(false);
    const [openDownloadSqlFileModal, setOpenDownloadSqlFileModal] =
        useState(false);
    const [openDownloadFastApiModal, setOpenDownloadFastApiModal] =
        useState(false);
    const [sqlEditorData, setSqlEditorData] = useState('');

    const { onVersionUpdate, isSuccess } = useSaveWorkbook();

    useEffect(() => {
        if (!openDownloadSqlFileModal) setSqlEditorData('');
    }, [openDownloadSqlFileModal]);

    function exportDropdownOption(selectedOption: any) {
        switch (selectedOption?.value) {
            case SQL_FILE_OPTION:
                mutateSqlFile();
                break;
            case FAST_API_DATA_MODAL_OPTION:
                setOpenDownloadFastApiModal(true);
                break;
            case SNAPSHOT_OPTION:
                downloadPngImageOfWorkbook();
                break;
            case UPCOMING_OPTION:
                break;
            default:
                break;
        }
    }

    const avatarMenuOptions = [
        {
            label: 'Profile',
            onClick: () => {
                setOpenProfileModal(true);
            }
        },
        { label: 'Logout', onClick: () => logout(user) }
    ];

    const errorMessage =
        'Error: 500 Internal Server Error, will be fixed soon...';

    const onGenerateSqlFileSuccess = ({ data }: any) => {
        setSqlEditorData(data.fileContent);
        setOpenDownloadSqlFileModal(true);
    };

    const onGenerateSqlFileError = () => {
        setSqlEditorData(errorMessage);
    };

    const { mutate: mutateSqlFile } = useGenerateSqlFile(
        onGenerateSqlFileSuccess,
        onGenerateSqlFileError
    );

    const onGenerateMigrationSqlFileSuccess = ({ data }: any) => {
        setSqlEditorData(data.fileContent);
        setOpenMigrationModal(false);
        setOpenDownloadSqlFileModal(true);
    };

    const onGenerateMigrationSqlFileError = () => {
        setSqlEditorData(errorMessage);
    };

    const { mutate } = useGenerateMigrationSqlFile(
        onGenerateMigrationSqlFileSuccess,
        onGenerateMigrationSqlFileError
    );

    return (
        <>
            <HeaderComponent
                onDragStart={onDragStart}
                avatarMenuOptions={avatarMenuOptions}
                setOpenResetViewModal={setOpenResetViewModal}
                exportDropdownOption={exportDropdownOption}
                setOpenMigrationModal={setOpenMigrationModal}
                setOpenSaveWorkbookModal={setOpenSaveWorkbook}
                setOpenSaveNewVersionModal={setOpenSaveNewVersionModal}
            />
            {openResetViewModal && (
                <ResetViewModal
                    open={openResetViewModal}
                    setOpen={setOpenResetViewModal}
                />
            )}
            {openDownloadSqlFileModal && (
                <DownloadSqlFileModal
                    data={sqlEditorData}
                    setData={setSqlEditorData}
                    open={openDownloadSqlFileModal}
                    setOpen={setOpenDownloadSqlFileModal}
                />
            )}
            {openDownloadFastApiModal && (
                <DownloadFastApiModal
                    open={openDownloadFastApiModal}
                    setOpen={setOpenDownloadFastApiModal}
                />
            )}
            {openProfileModal && (
                <ProfileViewModal
                    open={openProfileModal}
                    setOpen={setOpenProfileModal}
                />
            )}
            {openMigrationModal && (
                <MigrateModalComponent
                    open={openMigrationModal}
                    setOpen={setOpenMigrationModal}
                    isSuccess={isSuccess}
                    mutate={mutate}
                />
            )}
            {openSaveNewVersionModal && (
                <CommitWorkbookModalComponent
                    open={openSaveNewVersionModal}
                    setOpen={setOpenSaveNewVersionModal}
                />
            )}
        </>
    );
}
