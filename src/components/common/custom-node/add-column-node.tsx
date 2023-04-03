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
    const { addNewNode, tableId, tableName, onDeleteTable } = data;
    const [openModal, setOpenModal] = useState(false);
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    return (
        <>
            <div className=" mx-2.5 my-1 flex h-10 w-90 items-center justify-center space-x-4 text-grey-light">
                <div
                    className="w-4/5 rounded-md border border-dashed border-grey-main py-2 text-lg hover:border-grey-light hover:text-grey-lighter"
                    onClick={() => addNewNode(data, tableId)}
                >
                    <TfiPlus className="w-full align-middle text-xs " />
                </div>
                <div
                    className="w-1/5 rounded-md border border-dashed border-grey-main py-2 text-lg hover:border-grey-light hover:text-grey-lighter"
                    onClick={() => setOpenModal(true)}
                >
                    <RiDeleteBinLine className="w-full align-middle text-xs" />
                </div>
            </div>
            {openModal && (
                <ModalContainer
                    open={openModal}
                    setOpen={setOpenModal}
                    Header={
                        <div className="flex whitespace-nowrap">
                            Are you sure you want to delete ?
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
                            <p>
                                I agree to delete the table{' '}
                                {tableName.toUpperCase()}.
                            </p>
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
                                    onDeleteTable(tableId);
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

export default CustomAddNodeComponent;
