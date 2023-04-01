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
            className="flex w-full justify-center rounded-md bg-sea-light px-2 pt-2 text-lg font-bold text-sea-darkest shadow-lg outline-2 outline-stone-400"
            style={{ height: `${height * 3}rem` }}
        >
            {tableName}
        </div>
    );
};

export default CustomTableNodeComponent;
