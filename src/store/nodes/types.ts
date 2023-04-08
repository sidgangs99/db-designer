import { XYPosition } from 'reactflow';
import { ECustomNodeTypes } from '../../components/react-flow/types';

export interface ITableDetails {}

export interface IKeyConstraints {
    defaultValue: string;
}

export interface INodeMutations {
    onUpdateNode: any;
    onDeleteNode: any;
    addNewNode: any;
    deleteEdgeFromEdgeId: any;
    onDeleteTable: any;
    onReset: any;
}

export interface INodeDetails {
    columnName?: string;
    dataType: string;
    tableName: string;
    tableId: string;
    constraints: Record<string, any>;
    tableStyle?: any;
    additional: Record<string, any>;
    defaultValue?: any;
    mutations: INodeMutations;
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
