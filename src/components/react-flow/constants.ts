import { Edge, MarkerType } from 'reactflow';
import CustomColumnNodeComponent from '../common/customNode/column-node';
import CustomTableNodeComponent from '../common/customNode/table-node';
import { ECustomEdgeTypes, ECustomNodeTypes } from './types';

export const initialEdges: Edge<any>[] = [
    {
        id: 'employee.id-designation.employeeId',
        source: 'employee.id',
        target: 'designation.id',
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 15,
            height: 15,
            color: '#fb7185'
        },
        style: {
            strokeWidth: 1.5,
            stroke: '#fb7185'
        },
        type: ECustomEdgeTypes.ReferenceKey
    }
];

export const nodeTypes = {
    [ECustomNodeTypes.TableNode]: CustomTableNodeComponent,
    [ECustomNodeTypes.ColumnNode]: CustomColumnNodeComponent
};
