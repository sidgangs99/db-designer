import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import SQLDatatypeComponent from '../sql-types/component';

const CustomPrimaryColumnNodeComponent = ({ data }: { data: any }) => {
    const { name, dataType, refSource, refTarget } = data;
    return (
        <>
            <div className="mx-2 mb-6 flex h-8 w-80 items-center bg-chelsea-cucumber-100 px-4 pt-2">
                <div className="flex w-full items-center justify-between space-x-4 px-2 text-chelsea-cucumber-500">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                        {name}
                    </div>
                    <div className="nowheel">
                        <SQLDatatypeComponent />
                    </div>
                </div>
            </div>
            {refSource && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="!bg-teal-500"
                />
            )}
            {refTarget && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="!bg-teal-500"
                />
            )}
        </>
    );
};

export default CustomPrimaryColumnNodeComponent;
