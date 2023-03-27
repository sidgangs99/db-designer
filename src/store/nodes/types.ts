import { XYPosition } from 'reactflow';
import { ECustomNodeTypes } from '../../components/react-flow/types';

export interface ITableDetails {}

export interface INodeDetails {
    columnName?: string;
    dataType?: string;
    tableName: string;
    tableId: string;
    tableStyle?: any;
    onUpdateNode?: any;
    onDeleteNode?: any;
    addNewNode?: any;
    deleteEdgeFromEdgeId?: any;
    onDeleteTable?: any;
    onReset?: any;
}

export interface INode {
    id: string;
    draggable?: boolean;
    type?: ECustomNodeTypes;
    position?: XYPosition;
    data: INodeDetails;
    zIndex?: number;
    parentNode?: string;
    extent?: string;
    expandParent?: boolean;
}
