import CustomColumnNodeComponent from '../common/custom-node/column-node';
import CustomTableNodeComponent from '../common/custom-node/table-node';
import { ECustomNodeTypes } from './types';

export const nodeTypes = {
    [ECustomNodeTypes.TableNode]: CustomTableNodeComponent,
    [ECustomNodeTypes.ColumnNode]: CustomColumnNodeComponent
};
