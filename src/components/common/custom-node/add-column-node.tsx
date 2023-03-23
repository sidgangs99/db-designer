import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TfiPlus } from 'react-icons/tfi';

import { INodeDetails } from '../../../store/nodes/types';
import ButtonContainer from '../button/container';
import ModalContainer from '../modal/container';

const CustomAddNodeComponent = ({
    data,
    id
}: {
    data: INodeDetails;
    id: string;
}) => {
    const { addNewNode, tableDetails } = data;
    const [openModal, setOpenModal] = useState(false);
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    return (
        <>
            <div className="mx-4 flex h-full w-72 justify-center space-x-4">
                <div
                    className="w-4/5 rounded-md border border-dashed border-chelsea-cucumber-500 bg-chelsea-cucumber-100 py-2 text-lg bg-blend-darken hover:border-solid hover:shadow-2xl"
                    onClick={() => addNewNode(data, tableDetails.id)}
                >
                    <TfiPlus className="w-full fill-chelsea-cucumber-700 align-middle text-xs" />
                </div>
                <div
                    className="w-1/5 rounded-md border border-dashed border-chelsea-cucumber-500 bg-chelsea-cucumber-100 py-2 text-lg bg-blend-darken hover:border-solid hover:shadow-2xl"
                    onClick={() => setOpenModal(true)}
                >
                    <RiDeleteBinLine className="w-full fill-chelsea-cucumber-700 align-middle text-xs" />
                </div>
            </div>
            {openModal && (
                <ModalContainer
                    open={openModal}
                    setOpen={setOpenModal}
                    Header={
                        <h4 className="flex whitespace-nowrap">
                            Are you sure you want to delete ?
                        </h4>
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
                            <p>
                                I agree to delete the table{' '}
                                {tableDetails.name.toUpperCase()}
                            </p>
                        </div>
                    }
                    Footer={
                        <div className="flex items-center justify-between space-x-4">
                            <ButtonContainer
                                label={'Delete'}
                                onClick={() => {}}
                                disabled={!deleteEnabled}
                            />
                            <ButtonContainer
                                label={'Cancel'}
                                onClick={() => setOpenModal(false)}
                            />
                        </div>
                    }
                />
            )}
        </>
    );
};

export default CustomAddNodeComponent;
