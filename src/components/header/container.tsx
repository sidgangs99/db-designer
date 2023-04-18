import { useState } from 'react';

import { useThemeStore } from '../../store/darkMode/state';

import { SNAPSHOT_OPTION, SQL_FILE_OPTION, UPCOMING_OPTION } from '../../constants/export.constants';
import { downloadPngImageOfWorkbook } from '../../util/helper';

import useAuthStore from '../../store/firebase/state';
import HeaderComponent from './component';
import { IHeaderContainerProps } from './types';

export default function HeaderContainer(props: IHeaderContainerProps) {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const { user, logout }: any = useAuthStore();
    const { theme, updateTheme }: any = useThemeStore();

    const [openResetViewModal, setOpenResetViewModal] = useState(false);
    const [openDownloadSqlFileModal, setOpenDownloadSqlFileModal] =
        useState(false);

    function exportDropdownOption(selectedOption: any) {
        switch (selectedOption?.value) {
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

    const avatarMenuOptions = [
        {
            label: 'Profile',
            onClick: () => {
                console.log(user.displayName);
            }
        },
        { label: 'Logout', onClick: () => logout(user) }
    ];

    return (
        <HeaderComponent
            onDragStart={onDragStart}
            avatarMenuOptions={avatarMenuOptions}
            theme={theme}
            updateTheme={updateTheme}
            openResetViewModal={openResetViewModal}
            openDownloadSqlFileModal={openDownloadSqlFileModal}
            setOpenResetViewModal={setOpenResetViewModal}
            exportDropdownOption={exportDropdownOption}
            setOpenDownloadSqlFileModal={setOpenDownloadSqlFileModal}
        />
    );
}
