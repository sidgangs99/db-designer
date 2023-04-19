import { AiOutlineClear } from 'react-icons/ai';
import { BiSpreadsheet } from 'react-icons/bi';
import { TbFileExport } from 'react-icons/tb';

import { exportOptions } from '../../constants/export.constants';
import IconButtonContainer from '../common/icon-button/container';
import SingleSelectDropdownContainer from '../common/single-select-dropdown/container';
import DownloadSqlFileModal from './modals/download-sql';
import ResetViewModal from './modals/reset-view';

import { Tooltip } from 'react-tooltip';
import MenuContainer from '../common/menu/container';
import DownloadFastApiModal from './modals/download-fast-api-modal';
import { IHeaderComponentProps } from './types';

const HeaderComponent = (props: IHeaderComponentProps) => {
    const {
        onDragStart,
        avatarMenuOptions,
        openResetViewModal,
        openDownloadSqlFileModal,
        setOpenResetViewModal,
        exportDropdownOption,
        setOpenDownloadSqlFileModal,
        openDownloadFastApiModal,
        setOpenDownloadFastApiModal,
    } = props;

    return (
        <>
            <div className="flex w-full items-center justify-between px-6">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <IconButtonContainer
                            label={'Reset'}
                            className={''}
                            Icon={AiOutlineClear}
                            onClick={() => setOpenResetViewModal(true)}
                        />
                        <SingleSelectDropdownContainer
                            Icon={TbFileExport}
                            value={{ label: 'Export' }}
                            setValue={(e: any) => {
                                exportDropdownOption(e);
                            }}
                            values={exportOptions}
                            className="rounded-md border border-grey-main hover:border-coral-light hover:text-coral-light"
                            optionsClassName={"bg-grey-darker"}
                        />
                    </div>
                    <div
                        className="flex items-center border-l border-grey-light px-4"
                        data-tooltip-id={`new-table-button`}
                        data-tooltip-content={'Hey, drag me to the workbook'}
                    >
                        <IconButtonContainer
                            label={'New Table'}
                            Icon={BiSpreadsheet}
                            onDragStart={(event: any) => {
                                onDragStart(event, 'Table');
                            }}
                            draggable
                            className={'cursor-move'}
                        />
                        <Tooltip
                            id={`new-table-button`}
                            place="bottom"
                            className="align-middle"
                            openOnClick
                            closeOnEsc
                        />
                    </div>
                </div>
                <div className="flex h-full items-center justify-center space-x-4">
                    {/* <DarkModeBulbComponent
                        theme={theme}
                        onClick={() => {
                            const newTheme =
                                theme === darkTheme ? lightTheme : darkTheme;
                            updateTheme(newTheme);
                        }}
                    /> */}
                    <MenuContainer options={avatarMenuOptions} />
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
            {openDownloadFastApiModal && (
                <DownloadFastApiModal
                    open={openDownloadFastApiModal}
                    setOpen={setOpenDownloadFastApiModal}
                />
            )}
        </>
    );
};

export default HeaderComponent;
