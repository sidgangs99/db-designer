import { INodeDetails } from '../../../../store/nodes/types';

// Header
export function ConfigureColumnNodeHeader({ data }: { data: INodeDetails }) {
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
    data: INodeDetails;
    id: string;
    edges: any;
}

// Body
export function ConfigureColumnNodeBody(props: IConfigureColumnNodeBodyP) {}
