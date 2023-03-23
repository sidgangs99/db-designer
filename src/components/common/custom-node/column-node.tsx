import { memo, useEffect, useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Handle, Position, useEdges, useNodes } from 'reactflow';

import 'reactflow/dist/style.css';
import { INodeDetails } from '../../../store/nodes/types';
import ButtonContainer from '../button/container';
import ModalContainer from '../modal/container';
import {
    ConfigureColumnNodeBody,
    ConfigureColumnNodeHeader
} from './helper/configure-column-node';

export default memo(({ data, id }: { data: INodeDetails; id: string }) => {
    const { columnName, tableDetails, dataType, onDeleteNode } = data;
    const [openModal, setOpenModal] = useState(false);

    const nodes = useNodes();
    const edges = useEdges();

    useEffect(() => {}, [nodes, edges]);

    const handleOnNodeClick = () => {
        setOpenModal(!openModal);
    };

    return (
        <>
            <div
                className="group relative flex h-8 w-80 items-center rounded-lg border-chelsea-cucumber-600 bg-chelsea-cucumber-100 hover:border"
                onClick={handleOnNodeClick}
            >
                <div
                    className={`mb-2 flex w-full items-center justify-between space-x-4 px-4 pt-2 text-chelsea-cucumber-500 ${
                        edges.some((e) => e.source === id || e.target === id) &&
                        'text-rose-400'
                    } `}
                >
                    <div className="flex w-2/3 items-center bg-chelsea-cucumber-100 font-semibold line-clamp-1">
                        {columnName}
                    </div>
                    <div className="flex w-1/3 items-center justify-around ">
                        {dataType}
                    </div>
                </div>
                <div className="absolute -mt-4 flex h-full w-full items-start justify-end opacity-0 group-hover:opacity-100">
                    <HiOutlinePencilSquare className="rounded-full border border-chelsea-cucumber-600 bg-chelsea-cucumber-100 p-0.5 text-base text-chelsea-cucumber-600" />
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className={`p-1 ${
                    edges.some((e) => e.source === id)
                        ? 'bg-rose-400'
                        : 'bg-slate-600'
                }`}
            />
            <Handle
                type="target"
                position={Position.Left}
                className={` p-1 ${
                    edges.some((e) => e.target === id)
                        ? 'bg-amber-500'
                        : 'bg-slate-600'
                }`}
            />

            {openModal && (
                <ModalContainer
                    open={openModal}
                    setOpen={setOpenModal}
                    Header={
                        <ConfigureColumnNodeHeader
                            tableDetails={tableDetails}
                        />
                    }
                    Body={
                        <ConfigureColumnNodeBody
                            data={data}
                            id={id}
                            setOpenModal={setOpenModal}
                        />
                    }
                    Footer={
                        <div className="flex items-center justify-between space-x-4">
                            <ButtonContainer
                                label={'Delete'}
                                onClick={() => onDeleteNode(id)}
                            />
                            <ButtonContainer
                                label={'Update'}
                                type={'submit'}
                                form={'editTableColumn'}
                            />
                        </div>
                    }
                />
            )}
        </>
    );
});
