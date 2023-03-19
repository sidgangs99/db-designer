export interface IReactFlowContainerProps {}

export interface IReactFlowComponentProps extends IReactFlowContainerProps {
    onConnect: any;
    nodes: any;
    setNodes: any;
    onNodesChange: any;
    onEdgesChange: any;
    edges: any;
}

export enum ECustomNodeTypes {
    TableNode = 'tableNode',
    ColumnNode = 'columnNode',
    PrimaryColumnNode = 'primaryColumnNode'
}
