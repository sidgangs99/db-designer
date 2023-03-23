import CustomCancelEdge from '../common/custom-edge/cancel-edge';

export interface IReactFlowContainerProps {}

export interface IReactFlowComponentProps extends IReactFlowContainerProps {
    onConnect: any;
    nodes: any;
    setNodes: any;
    onNodesChange: any;
    onEdgesChange: any;
    edges: any;
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

export const customEdgeTypes = {
    [ECustomEdgeTypes.ReferenceKey]: CustomCancelEdge
};
