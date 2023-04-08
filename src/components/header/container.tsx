import { useState } from 'react';

import { useThemeStore } from '../../store/darkMode/state';

import { downloadPngImageOfWorkbook } from '../../util/helper';
import { SNAPSHOT_OPTION, SQL_FILE_OPTION, UPCOMING_OPTION } from './constants';
import { useSaveWorkbook } from './hooks/useSaveWorkbook';

import useAuthStore from '../../store/firebase/state';
import SidebarComponent from './component';
import { ISidebarContainerProps } from './types';

export default function SidebarContainer(props: ISidebarContainerProps) {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { logout }: any = useAuthStore();
    const { theme, updateTheme }: any = useThemeStore();

    const [openResetViewModal, setOpenResetViewModal] = useState(false);
    const [openDownloadSqlFileModal, setOpenDownloadSqlFileModal] =
        useState(false);

    const { refetch: fetchSaveWorkbook } = useSaveWorkbook();

    function exportDropdownOption(selectedOption: string) {
        switch (selectedOption) {
            case SQL_FILE_OPTION:
                setOpenDownloadSqlFileModal(true);
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

    const avatarMenuOptions = [{ label: 'Logout', onClick: logout }];

    return (
        <SidebarComponent
            onDragStart={onDragStart}
            avatarMenuOptions={avatarMenuOptions}
            theme={theme}
            updateTheme={updateTheme}
            openResetViewModal={openResetViewModal}
            openDownloadSqlFileModal={openDownloadSqlFileModal}
            setOpenResetViewModal={setOpenResetViewModal}
            fetchSaveWorkbook={fetchSaveWorkbook}
            exportDropdownOption={exportDropdownOption}
            setOpenDownloadSqlFileModal={setOpenDownloadSqlFileModal}
        />
    );
}
