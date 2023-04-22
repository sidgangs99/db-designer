import { useState } from 'react';

import {
    FAST_API_DATA_MODAL_OPTION,
    SNAPSHOT_OPTION,
    SQL_FILE_OPTION,
    UPCOMING_OPTION
} from '../../constants/export.constants';
import { downloadPngImageOfWorkbook } from '../../util/helper';

import useAuthStore from '../../store/firebase/state';
import useWorkbookStore, { IWorkbookStore } from '../../store/workbook/state';
import HeaderComponent from './component';
import DownloadFastApiModal from './modals/download-fast-api-modal';
import DownloadSqlFileModal from './modals/download-sql';
import ProfileViewModal from './modals/profile';
import ResetViewModal from './modals/reset-view';
import SnapshotModalComponent from './modals/snapshot-modal';
import SaveWorkbookModalComponent from './save-workbook/save-workbook-modal';
import { IHeaderContainerProps } from './types';

export default function HeaderContainer(props: IHeaderContainerProps) {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { user, logout }: any = useAuthStore();
    const { openSaveWorkbook, setOpenSaveWorkbook }: IWorkbookStore =
        useWorkbookStore();

    const [openResetViewModal, setOpenResetViewModal] = useState(false);
    const [openSnapshotModal, setOpenSnapshotModal] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openDownloadSqlFileModal, setOpenDownloadSqlFileModal] =
        useState(false);
    const [openDownloadFastApiModal, setOpenDownloadFastApiModal] =
        useState(false);

    function exportDropdownOption(selectedOption: any) {
        switch (selectedOption?.value) {
            case SQL_FILE_OPTION:
                setOpenDownloadSqlFileModal(true);
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

    return (
        <>
            <HeaderComponent
                onDragStart={onDragStart}
                avatarMenuOptions={avatarMenuOptions}
                setOpenResetViewModal={setOpenResetViewModal}
                exportDropdownOption={exportDropdownOption}
                setOpenSnapshotModal={setOpenSnapshotModal}
                setOpenSaveWorkbookModal={setOpenSaveWorkbook}
            />
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
            {openSnapshotModal && (
                <SnapshotModalComponent
                    open={openSnapshotModal}
                    setOpen={setOpenSnapshotModal}
                />
            )}
            {openSaveWorkbook && (
                <SaveWorkbookModalComponent
                    open={openSaveWorkbook}
                    setOpen={setOpenSaveWorkbook}
                />
            )}
        </>
    );
}
