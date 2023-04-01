import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BiSpreadsheet } from 'react-icons/bi';
import { BsSunFill } from 'react-icons/bs';
import { FiCamera, FiSave } from 'react-icons/fi';
import { MdDarkMode } from 'react-icons/md';
import { TbFileExport } from 'react-icons/tb';

import { useStore } from 'zustand';
import { darkTheme, lightTheme } from '../../store/darkMode/constants';
import { useThemeStore } from '../../store/darkMode/state';

import { useAuthStore } from '../../store/firebase/state';
import { downloadPngImageOfWorkbook } from '../../util/helper';
import ButtonContainer from '../common/button/container';
import IconButtonContainer from '../common/icon-button/container';
import IconComponent from '../common/icon/component';
import SingleSelectDropdownContainer from '../common/single-select-dropdown/container';
import { exportOptions, SQL_FILE_OPTION, UPCOMING_OPTION } from './constants';
import { useSaveWorkbook } from './hooks/useSaveWorkbook';
import DownloadSqlFileModal from './modals/download-sql';
import ResetViewModal from './modals/reset-view';

import { ISidebarComponentProps } from './types';

const SidebarComponent = (props: ISidebarComponentProps) => {
    const { onDragStart } = props;

    const { logout }: any = useStore(useAuthStore);
    const { theme, updateTheme }: any = useStore(useThemeStore);

    const [openResetViewModal, setOpenResetViewModal] = useState(false);
    const [openDownloadSqlFileModal, setOpenDownloadSqlFileModal] =
        useState(false);

    const { refetch: fetchSaveWorkbook } = useSaveWorkbook();

    function exportDropdownOption(selectedOption: string) {
        switch (selectedOption) {
            case SQL_FILE_OPTION:
                setOpenDownloadSqlFileModal(true);
                break;
            case UPCOMING_OPTION:
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="flex w-full items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border-r border-slate-main pr-4 dark:border-rose-300 ">
                        <IconButtonContainer
                            label={'Reset'}
                            className={''}
                            Icon={AiOutlineClear}
                            onClick={() => setOpenResetViewModal(true)}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <SingleSelectDropdownContainer
                            Icon={TbFileExport}
                            value={'Export'}
                            setValue={(e: any) => exportDropdownOption(e)}
                            values={exportOptions}
                        />
                        <IconButtonContainer
                            label={'Snapshot'}
                            Icon={FiCamera}
                            className={''}
                            onClick={() => downloadPngImageOfWorkbook()}
                        />
                        <IconButtonContainer
                            label={'Save'}
                            Icon={FiSave}
                            className={''}
                            onClick={() => fetchSaveWorkbook()}
                        />
                    </div>
                    <div className="flex items-center border-l border-slate-main px-6 dark:border-rose-300">
                        <IconButtonContainer
                            label={'Table'}
                            Icon={BiSpreadsheet}
                            onDragStart={(event: any) =>
                                onDragStart(event, 'Table')
                            }
                            draggable
                            className={'cursor-move'}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <IconComponent
                        Icon={theme === darkTheme ? MdDarkMode : BsSunFill}
                        onClick={() => {
                            const newTheme =
                                theme === darkTheme ? lightTheme : darkTheme;
                            updateTheme(newTheme);
                        }}
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
                />
            )}
        </>
    );
};

export default SidebarComponent;
