import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsFiletypeSql } from 'react-icons/bs';
import { SiMetrodelaciudaddemexico } from 'react-icons/si';
import { TfiSave } from 'react-icons/tfi';

import { useNodes } from 'reactflow';
import { useStore } from 'zustand';

import { useAuthStore } from '../../store/firebase/state';
import ButtonContainer from '../common/button/container';
import DownloadButton from '../common/downloadHTML/component';
import ModalContainer from '../common/modal/container';
import { useDownloadSqlFile } from './hooks/useDownloadSqlFile';
import { useSaveWorkbook } from './hooks/useSaveWorkbook';

import { ISidebarComponentProps } from './types';

const SidebarComponent = (props: ISidebarComponentProps) => {
    const { logout }: any = useStore(useAuthStore);
    const [openModal, setOpenModal] = useState(false);
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    const { onDragStart } = props;
    const nodes: any = useNodes();
    const { refetch: fetchSaveWorkbook } = useSaveWorkbook();
    const { refetch: fetchDownloadSqlFile } = useDownloadSqlFile();

    return (
        <>
            <div className="flex w-full items-center justify-between px-6">
                <div className="flex space-x-4">
                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white font-bold hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onClick={() => setOpenModal(true)}
                        draggable
                    >
                        <AiOutlineClear className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <div
                        className="cursor-move rounded-lg border border-chelsea-cucumber-200 bg-white font-bold hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onDragStart={(event) => onDragStart(event, 'Table')}
                        draggable
                    >
                        <SiMetrodelaciudaddemexico className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white font-bold hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200">
                        <DownloadButton />
                    </div>
                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white font-bold hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onClick={(e: any) => {
                            fetchDownloadSqlFile();
                        }}
                        draggable
                    >
                        <BsFiletypeSql className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                    </div>

                    <div
                        className="cursor-pointer rounded-lg border border-chelsea-cucumber-200 bg-white font-bold hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        onClick={(e: any) => {
                            fetchSaveWorkbook();
                        }}
                        draggable
                    >
                        <TfiSave className="m-1.5 fill-chelsea-cucumber-700 text-base" />
                    </div>
                    <ButtonContainer label="Logout" onClick={() => logout()} />
                </div>
            </div>
            {openModal && (
                <ModalContainer
                    open={openModal}
                    setOpen={setOpenModal}
                    Header={
                        <div className="flex whitespace-nowrap">
                            Are you sure you want to reset the view ?
                        </div>
                    }
                    Body={
                        <div className="flex space-x-2">
                            <input
                                type={'checkbox'}
                                checked={deleteEnabled}
                                onChange={() =>
                                    setDeleteEnabled(!deleteEnabled)
                                }
                            />
                            <p>I agree to reset the view</p>
                        </div>
                    }
                    Footer={
                        <div className="flex items-center justify-between space-x-4">
                            <ButtonContainer
                                label={'Cancel'}
                                onClick={() => setOpenModal(false)}
                            />
                            <ButtonContainer
                                label={'Delete'}
                                onClick={() => {
                                    nodes?.[0].data.onReset();
                                    setOpenModal(false);
                                }}
                                disabled={!deleteEnabled}
                            />
                        </div>
                    }
                />
            )}
        </>
    );
};

export default SidebarComponent;
