
export interface IReactFlowContainerProps {}

export interface IReactFlowComponentProps extends IReactFlowContainerProps {
    reactFlowWrapper: any;
    onDrop: any;
    onDragOver: any;
    setReactFlowInstance: any;
}

export enum ECustomNodeTypes {
    TableNode = 'tableNode',
    ColumnNode = 'columnNode',
    AddColumnNode = 'addColumnNode'
}

export enum ECustomEdgeTypes {
    ReferenceKey = 'refKey'
}


