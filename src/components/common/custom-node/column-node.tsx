import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Handle, Position, useStore } from 'reactflow';

import 'reactflow/dist/style.css';
import { sqlTypeColor } from '../../../constants/column.constants';
import { postgresDataTypeInputTypeMapping } from '../../../constants/postgres.constants';
import { useLayoutStore } from '../../../store/layout/store';
import useWorkbookStore from '../../../store/workbook/state';
import { INodeData } from '../../../store/workbook/types';

const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

export default function CustomColumnNodeComponent({
    data,
    id
}: {
    data: INodeData;
    id: string;
}) {
    const { columnName, dataType = postgresDataTypeInputTypeMapping[0] } = data;
    const { setOpenRightSideBar } = useLayoutStore();
    const { edges } = useWorkbookStore();

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isTarget = connectionNodeId && connectionNodeId !== id;
    const targetHandleStyle = { zIndex: isTarget ? 3 : 1 };

    const handleOnNodeClick = () => {
        setOpenRightSideBar(id);
    };

    const isPrimaryKey = data?.constraints?.primaryKey || false;
    const isParentKey = edges.some((e) => e.source === id);
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
                    <div className="flex w-2/5 items-center px-2">
                        <p className="overflow-hidden text-ellipsis">
                            {columnName}
                        </p>
                    </div>
                    <div
                        className={`flex w-2/5 items-center px-2 ${
                            sqlTypeColor[dataType.type]
                        }`}
                    >
                        <p className="overflow-hidden text-ellipsis lowercase">
                            {dataType.label}
                        </p>
                    </div>
                    <div className="flex w-1/5 ">
                        {(isPrimaryKey || isForeignKey) && (
                            <div className="flex rounded-full bg-grey-main px-2 py-1 text-sm">
                                {isPrimaryKey ? <div>PK</div> : ''}
                                {isPrimaryKey && isForeignKey ? (
                                    <div className="px-0.5"> : </div>
                                ) : (
                                    ''
                                )}
                                {isForeignKey ? <div>FK</div> : ''}
                            </div>
                        )}
                    </div>
                </div>
                <div className="absolute mx-1.5 -mt-3 flex h-full w-full items-start justify-end opacity-0 group-hover:opacity-100">
                    <HiOutlinePencilSquare className="rounded-sm border border-grey-main bg-grey-dark p-0.5 text-base" />
                </div>
            </div>
            <>
                <Handle
                    className={`border-coral-light p-1 ${
                        isForeignKey && 'border-coral-main'
                    }`}
                    style={targetHandleStyle}
                    position={Position.Right}
                    isValidConnection={(connection) =>
                        connection.source !== connection?.target
                    }
                    type="target"
                    id="target-right"
                />
                <Handle
                    className={`border-coral-light p-1 ${
                        isForeignKey && 'border-coral-main'
                    }`}
                    style={targetHandleStyle}
                    position={Position.Left}
                    isValidConnection={(connection) =>
                        connection.source !== connection?.target
                    }
                    type="target"
                    id="target-left"
                />
                <Handle
                    className={`p-1 ${isForeignKey && 'border-coral-main'}`}
                    style={{ zIndex: 2 }}
                    position={Position.Left}
                    isValidConnection={(connection) =>
                        connection.source !== connection?.target
                    }
                    type="source"
                    id="source-left"
                />
                <Handle
                    className={`p-1 ${isForeignKey && 'border-coral-main'}`}
                    style={{ zIndex: 2 }}
                    position={Position.Right}
                    isValidConnection={(connection) =>
                        connection.source !== connection?.target
                    }
                    type="source"
                    id="source-right"
                />
            </>
        </>
    );
}
