import { useEffect, useState } from 'react';
import { useNodes } from 'reactflow';

import { INodeDetails } from '../../../store/nodes/types';

const CustomTableNodeComponent = ({ data }: { data: INodeDetails }) => {
    const { tableDetails } = data;
    const [height, setHeight] = useState<number>(0);
    const nodes = useNodes();

    useEffect(() => {
        heightOfTable();
    }, [nodes]);

    const heightOfTable = () => {
        const totalColumns = nodes.filter(
            (_node: any) => _node.data.tableDetails.id === tableDetails.id
        );
        setHeight(totalColumns.length);
    };

    return (
        <div
            className="flex w-full justify-center rounded-md bg-chelsea-cucumber-100 px-2 pt-2 text-lg font-bold uppercase text-chelsea-cucumber-600 shadow-lg outline-2 outline-stone-400"
            style={{ height: `${height * 3}rem` }}
        >
            {tableDetails.name}
        </div>
    );
};

export default CustomTableNodeComponent;
