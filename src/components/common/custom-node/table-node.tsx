import { HiOutlinePencilSquare } from 'react-icons/hi2';

import { useLayoutStore } from '../../../store/layout/store';
import { INodeData } from '../../../store/workbook/types';

const CustomTableNodeComponent = ({
    id,
    data
}: {
    data: INodeData;
    id: string;
}) => {
    const { tableName, tableId } = data;
    const { setOpenRightSideBar } = useLayoutStore();

    const handleOnNodeClick = () => {
        setOpenRightSideBar(id);
    };

    return (
        <div
            className="top-12 flex h-full w-95 justify-center rounded-md border-2 border-grey-lighter bg-grey-darker"
            onClick={handleOnNodeClick}
        >
            <div className="group relative m-2 flex h-10 w-90 items-center justify-center rounded-sm bg-grey-main font-semibold hover:border">
                <p className="flex w-full items-center justify-center">
                    {tableName}
                </p>
                <div className="absolute -mr-3 -mt-3 flex h-full w-full items-start justify-end opacity-0 group-hover:opacity-100">
                    <HiOutlinePencilSquare className="rounded-sm border border-grey-main bg-grey-dark p-0.5 text-base" />
                </div>
            </div>
        </div>
    );
};

export default CustomTableNodeComponent;
