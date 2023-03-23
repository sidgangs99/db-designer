import { useState } from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { SiMetrodelaciudaddemexico } from 'react-icons/si';
import { useNodes } from 'reactflow';
import ButtonContainer from '../common/button/container';
import ModalContainer from '../common/modal/container';

import { ISidebarComponentProps } from './types';

const SidebarComponent = (props: ISidebarComponentProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    const { onDragStart } = props;
    const nodes: any = useNodes();

    return (
        <>
            <div className="flex w-full items-center justify-between px-6">
                <div></div>

                <div className="flex space-x-4">
                    <div
                        className="cursor-pointer rounded-lg bg-neutral-800  font-bold"
                        onDragStart={(event) => onDragStart(event, 'Table')}
                        draggable
                    >
                        <SiMetrodelaciudaddemexico className=" m-2 fill-chelsea-cucumber-500 text-lg" />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div
                        className="cursor-pointer rounded-lg bg-neutral-800 font-bold"
                        onClick={() => setOpenModal(true)}
                        draggable
                    >
                        <AiOutlineClear className="m-2 fill-chelsea-cucumber-500 text-lg" />
                    </div>
                    <div className="cursor-pointer rounded-lg border border-neutral-800 px-4 py-1 ">
                        Login
                    </div>
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
