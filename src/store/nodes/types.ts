import { ECustomNodeTypes } from '../../components/react-flow/types';

export interface ITableData {
    columnName?: string;
    dataType?: string;
    tableName: string;
    tableStyle?: any;
}

export interface INode {
    id: string;
    draggable?: boolean;
    type?: ECustomNodeTypes;
    position?: { x: number; y: number };
    data: ITableData;
    zIndex?: number;
    parentNode?: string;
    extent?: string;
    expandParent?: boolean;
}
