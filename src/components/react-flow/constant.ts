import CustomCancelEdge from '../common/custom-edge/cancel-edge';
import CustomColumnNodeComponent from '../common/custom-node/column-node';
import CustomTableNodeComponent from '../common/custom-node/table-node';
import { ECustomEdgeTypes, ECustomNodeTypes } from './types';


export const nodeTypes = {
    [ECustomNodeTypes.TableNode]: CustomTableNodeComponent,
    [ECustomNodeTypes.ColumnNode]: CustomColumnNodeComponent
};

export const customEdgeTypes = {
    [ECustomEdgeTypes.ReferenceKey]: CustomCancelEdge
};
