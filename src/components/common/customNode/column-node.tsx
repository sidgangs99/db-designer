import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Handle, Position } from 'reactflow';

import 'reactflow/dist/style.css';
import {
    useIsASourceEdge,
    useIsASourceOrTargetEdge,
    useIsATargetEdge
} from '../../../store/edges/hooks';

const CustomPrimaryColumnNodeComponent = ({
    data,
    id
}: {
    data: any;
    id: string;
}) => {
    const { name } = data;

    return (
        <>
            <div
                className="group relative flex h-8 w-80 items-center rounded-lg border-chelsea-cucumber-600 bg-chelsea-cucumber-100 hover:border"
                onClick={() => {
                    console.log('Hi');
                }}
            >
                <div
                    className={`mb-2 flex w-full items-center justify-between space-x-4 px-4 pt-2 text-chelsea-cucumber-500 ${
                        useIsASourceOrTargetEdge(id) && 'text-rose-400'
                    } `}
                >
                    <div
                        className={`flex w-2/3 items-center overflow-hidden text-ellipsis bg-chelsea-cucumber-100 font-semibold`}
                    >
                        {name}
                    </div>
                    <div className="flex w-1/3 items-center justify-around ">
                        varchar
                        {/* <SQLDatatypeComponent /> */}
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
                    useIsASourceEdge(id) ? 'bg-rose-400' : 'bg-slate-600'
                }`}
            />
            <Handle
                type="target"
                position={Position.Left}
                className={` p-1 ${
                    useIsATargetEdge(id) ? 'bg-amber-500' : 'bg-slate-600'
                }`}
            />
        </>
    );
};

export default CustomPrimaryColumnNodeComponent;
