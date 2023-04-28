import { AiOutlineClear } from 'react-icons/ai';
import { BiSave, BiSpreadsheet } from 'react-icons/bi';
import { TbFileExport, TbVersions } from 'react-icons/tb';

import { exportOptions } from '../../constants/export.constants';
import IconButtonContainer from '../common/icon-button/container';
import SingleSelectDropdownContainer from '../common/single-select-dropdown/container';

import { Tooltip } from 'react-tooltip';
import AvatarDropdownComponent from '../common/single-select-dropdown/avatar.component';
import { useSaveWorkbook } from '../hooks/useSaveWorkbook';
import { IHeaderComponentProps } from './types';

const HeaderComponent = (props: IHeaderComponentProps) => {
    const {
        onDragStart,
        avatarMenuOptions,
        setOpenResetViewModal,
        exportDropdownOption,
        setOpenMigrationModal
    } = props;

    const { onSubmit } = useSaveWorkbook();

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
                        <IconButtonContainer
                            label={'Versions'}
                            Icon={TbVersions}
                            className={''}
                            onClick={() => setOpenMigrationModal(true)}
                        />
                        <SingleSelectDropdownContainer
                            Icon={TbFileExport}
                            value={{ label: 'Export' }}
                            setValue={(e: any) => {
                                exportDropdownOption(e);
                            }}
                            values={exportOptions}
                            className="rounded-md border border-grey-main hover:border-coral-light hover:text-coral-light"
                            optionsClassName={'bg-grey-darker'}
                        />
                    </div>

                    <div className="flex items-center space-x-4 border-l border-grey-light px-4">
                        <IconButtonContainer
                            label={'Save'}
                            className={''}
                            Icon={BiSave}
                            onClick={() => onSubmit()}
                        />
                        <div
                            data-tooltip-id={`new-table-button`}
                            data-tooltip-content={
                                'Hey, drag me to the workbook'
                            }
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

                    <AvatarDropdownComponent values={avatarMenuOptions} />
                </div>
            </div>
        </>
    );
};

export default HeaderComponent;
