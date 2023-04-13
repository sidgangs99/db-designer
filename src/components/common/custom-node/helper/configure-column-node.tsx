import { INodeData } from '../../../../store/workbook/types';

// Header
export function ConfigureColumnNodeHeader({ data }: { data: INodeData }) {
    const { columnName, tableName } = data;
    return (
        <div className="text-chelsea-cucumber-600 flex space-x-1">
            <p className="">{tableName}</p>
            <p className="px-3">{'->'}</p>
            <p className="">{columnName}</p>
        </div>
    );
}

interface IConfigureColumnNodeBodyP {
    data: INodeData;
    id: string;
    edges: any;
}

// Body
export function ConfigureColumnNodeBody(props: IConfigureColumnNodeBodyP) {}
