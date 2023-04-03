import { uuid } from '../../util/helper';
import CustomColumnNodeComponent from '../common/custom-node/column-node';
import CustomTableNodeComponent from '../common/custom-node/table-node';
import { ECustomEdgeTypes, ECustomNodeTypes } from './types';

export const nodeTypes = {
    [ECustomNodeTypes.TableNode]: CustomTableNodeComponent,
    [ECustomNodeTypes.ColumnNode]: CustomColumnNodeComponent
};

export const newEdge = (source: string, target: string) => {
    return {
        id: uuid(),
        source: source,
        target: target,
        style: {
            strokeWidth: 2
            // stroke: customColors.grey.lighter
        },
        type: ECustomEdgeTypes.ReferenceKey
    };
};
