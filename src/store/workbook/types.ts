import { Node } from 'reactflow';

export interface ITableDetails {}

export interface IKeyConstraints {
    defaultValue: string;
}

export interface INodeMutations {
    updateNodeData: any;
    onDeleteNode: any;
    addNewColumnNode: any;
    deleteEdgeFromEdgeId: any;
    onDeleteTable: any;
    onReset: any;
}

export interface INodeData {
    columnName?: string;
    dataType?: Record<string, any>;
    tableName: string;
    tableId: string;
    constraints?: Record<string, any>;
    tableStyle?: any;
    additional?: Record<string, any>;
    defaultValue?: any;
    defaultValueOption?: Record<string, any>;
}

export interface INode extends Node<INodeData> {}
