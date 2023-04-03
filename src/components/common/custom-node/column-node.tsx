import { memo, useEffect, useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Handle, Position, useEdges, useNodes } from 'reactflow';

import 'reactflow/dist/style.css';
import { useStore } from 'zustand';
import { useLayoutStore } from '../../../store/layout/store';
import { INodeDetails } from '../../../store/nodes/types';
import { sqlInputType, sqlTypeColor } from '../sql-types/constants';

export default memo(({ data, id }: { data: INodeDetails; id: string }) => {
    const { columnName, dataType, onDeleteNode } = data;

    const { setOpenRightSideBar } = useStore(useLayoutStore);
    const [openModal, setOpenModal] = useState(false);

    const nodes = useNodes();
    const edges = useEdges();

    useEffect(() => {}, [nodes, edges]);

    const handleOnNodeClick = () => {
        setOpenRightSideBar(id);
    };

    const isPrimaryKey = data?.constraints?.primaryKey || false;
    const isForeignKey = edges.some((e) => e.target === id);

    return (
        <>
            <div
                className="group relative m-2.5 flex h-10 w-90 items-center rounded-sm hover:border"
                onClick={handleOnNodeClick}
            >
                <div
                    className={`flex h-full w-full items-center justify-between rounded-sm bg-grey-dark ${
                        isPrimaryKey || isForeignKey
                            ? 'text-coral-darkest'
                            : 'text-coral-darker'
                    } `}
                >
                    <div className="flex w-2/5 items-center px-2 line-clamp-1">
                        {columnName}
                    </div>
                    <div
                        className={`flex w-2/5 items-center ${
                            sqlTypeColor[sqlInputType[dataType]]
                        }`}
                    >
                        {dataType}
                    </div>
                    <div className="flex w-1/5 ">
                        {(isPrimaryKey || isForeignKey) && (
                            <p className="flex rounded-full bg-grey-main px-2 py-1 text-sm">
                                {isPrimaryKey ? 'PK' : isForeignKey ? 'FK' : ''}
                            </p>
                        )}
                    </div>
                </div>
                <div className="absolute mx-1.5 -mt-3 flex h-full w-full items-start justify-end opacity-0 group-hover:opacity-100">
                    <HiOutlinePencilSquare className="rounded-sm border border-grey-main bg-grey-dark p-0.5 text-base" />
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className={`border-grey-lighter p-1`}
            />
            <Handle type="target" position={Position.Left} className={`p-1`} />

            {/* {openModal && (
                <ModalContainer
                    open={openModal}
                    setOpen={setOpenModal}
                    className={'h-1/2 w-1/4'}
                    Header={<ConfigureColumnNodeHeader data={data} />}
                    Body={
                        <ConfigureColumnNodeBody
                            data={data}
                            id={id}
                            edges={edges}
                        />
                    }
                    Footer={
                        <div className="mt-10 flex items-center justify-between space-x-4">
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
            )} */}
        </>
    );
});
