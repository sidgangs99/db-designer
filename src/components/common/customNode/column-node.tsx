import { useState } from 'react';
import { Handle, Position } from 'reactflow';

import 'reactflow/dist/style.css';
import { useIsASourceEdge, useIsATargetEdge } from '../../../store/edges/hooks';
import SQLDatatypeComponent from '../sql-types/component';

const CustomPrimaryColumnNodeComponent = ({
    data,
    id
}: {
    data: any;
    id: string;
}) => {
    const { name } = data;
    const [columnName, setColumnName] = useState<string>(name);

    return (
        <>
            <div className="mb-6 flex h-8 w-80 items-center bg-chelsea-cucumber-100 px-4 pt-2">
                <div className="flex w-full items-center justify-between space-x-4 text-chelsea-cucumber-500">
                    <div className="w-2/3 overflow-hidden text-ellipsis font-semibold">
                        <input
                            type="text"
                            value={columnName}
                            className={`cursor-text bg-chelsea-cucumber-100 outline-none hover:text-chelsea-cucumber-600 ${
                                useIsASourceEdge(id) && 'text-orange-500'
                            } ${useIsATargetEdge(id) && 'text-orange-500'}`}
                            onChange={({ target }: any) =>
                                setColumnName(target.value)
                            }
                        />
                    </div>
                    <div className="nowheel w-1/3">
                        <SQLDatatypeComponent />
                    </div>
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                className={`p-1 ${
                    useIsASourceEdge(id) ? 'bg-orange-500' : 'bg-slate-600'
                }`}
            />
            <Handle
                type="target"
                position={Position.Left}
                className={` p-1 ${
                    useIsATargetEdge(id) ? 'bg-yellow-300' : 'bg-slate-600'
                }`}
            />
        </>
    );
};

export default CustomPrimaryColumnNodeComponent;
