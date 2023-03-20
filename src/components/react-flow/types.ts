import CustomCancelEdge from '../common/customEdge/cancel-edge';

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
    ColumnNode = 'columnNode'
}

export enum ECustomEdgeTypes {
    ReferenceKey = 'refKey'
}

export const customEdgeTypes = {
    [ECustomEdgeTypes.ReferenceKey]: CustomCancelEdge
};
