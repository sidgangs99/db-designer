import CustomCancelEdge from '../common/custom-edge/cancel-edge';
import CustomColumnNodeComponent from '../common/custom-node/column-node';
import CustomTableNodeComponent from '../common/custom-node/table-node';

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

export const customEdgeTypes = {
    [ECustomEdgeTypes.ReferenceKey]: CustomCancelEdge
};

export const nodeTypes = {
    [ECustomNodeTypes.TableNode]: CustomTableNodeComponent,
    [ECustomNodeTypes.ColumnNode]: CustomColumnNodeComponent
};
