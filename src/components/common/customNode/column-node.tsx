import { Handle, Position } from 'reactflow';

const CustomPrimaryColumnNodeComponent = ({ data }: { data: any }) => {
    const { name, dataType, refSource, refTarget } = data;
    return (
        <div className="mx-0.5 flex w-full justify-center border-t-2 border-stone-500 bg-white px-4 py-2">
            <div className="flex space-x-1">
                <div className="font-semibold">{name} :</div>
                <div className="text-gray-500">{dataType}</div>
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
        </div>
    );
};

export default CustomPrimaryColumnNodeComponent;
