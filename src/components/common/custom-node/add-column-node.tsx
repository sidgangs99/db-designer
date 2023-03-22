import { TfiPlus } from 'react-icons/tfi';
import { ITableData } from '../../../store/nodes/types';

const CustomAddNodeComponent = ({ data }: { data: ITableData }) => {
    const { addNewNode } = data;
    return (
        <div
            className="mx-4 flex h-full w-72 justify-center rounded-md border border-dashed border-chelsea-cucumber-500 bg-chelsea-cucumber-100 py-2 text-lg bg-blend-darken hover:border-solid hover:shadow-2xl"
            onClick={() => addNewNode(data)}
        >
            <TfiPlus className="fill-chelsea-cucumber-700 text-xs" />
        </div>
    );
};

export default CustomAddNodeComponent;
