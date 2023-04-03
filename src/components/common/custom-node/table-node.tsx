import { useEffect, useState } from 'react';
import { useNodes } from 'reactflow';

import { INodeDetails } from '../../../store/nodes/types';

const CustomTableNodeComponent = ({ data }: { data: INodeDetails }) => {
    const { tableName, tableId } = data;
    const [height, setHeight] = useState<number>(0);
    const nodes = useNodes();

    useEffect(() => {
        heightOfTable();
    }, [nodes]);

    const heightOfTable = () => {
        const totalColumns = nodes.filter(
            (_node: any) => _node.data.tableId === tableId
        );
        setHeight(totalColumns.length);
    };

    return (
        <div
            className="top-12 flex w-95 justify-center rounded-md border-2 border-grey-lighter"
            style={{ height: `${height * 53}px` }}
        >
            <div className="m-2 flex h-10 w-full items-center justify-center rounded-sm bg-grey-main font-semibold">
                <p className="flex w-full items-center justify-center">
                    {tableName}
                </p>
                <p className="w-1/12"></p>
            </div>
        </div>
    );
};

export default CustomTableNodeComponent;
