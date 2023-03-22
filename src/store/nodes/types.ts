import { XYPosition } from 'reactflow';
import { ECustomNodeTypes } from '../../components/react-flow/types';

export interface ITableData {
    columnName?: string;
    dataType?: string;
    tableName: string;
    tableStyle?: any;
    updateNode?: any;
}

export interface INode {
    id: string;
    draggable?: boolean;
    type?: ECustomNodeTypes;
    position?: XYPosition;
    data: ITableData;
    zIndex?: number;
    parentNode?: string;
    extent?: string;
    expandParent?: boolean;
}
