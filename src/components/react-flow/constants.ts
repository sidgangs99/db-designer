import { Edge, MarkerType } from 'reactflow';
import { INode } from '../../store/nodes/types';
import CustomColumnNodeComponent from '../common/customNode/column-node';
import CustomTableNodeComponent from '../common/customNode/table-node';
import { ECustomEdgeTypes, ECustomNodeTypes } from './types';

export const initialNodes: INode[] = [
    {
        id: 'employee',
        position: { x: 500, y: 500 },
        zIndex: 20,
        data: { tableName: 'employee' },
        type: ECustomNodeTypes.TableNode
    },
    {
        id: 'employee.name',
        draggable: false,
        position: { x: 0, y: 50 },
        data: {
            columnName: 'Employee name',
            dataType: 'varchar',
            tableName: 'employee'
        },
        parentNode: 'employee',
        zIndex: 20,
        extent: 'parent',
        type: ECustomNodeTypes.ColumnNode,
        expandParent: true
    },
    {
        id: 'employee.id',
        draggable: false,
        position: { x: 0, y: 100 },
        data: {
            columnName: 'Id',
            dataType: 'varchar',
            tableName: 'designation'
        },
        parentNode: 'employee',
        zIndex: 20,
        type: ECustomNodeTypes.ColumnNode,
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'employee.salary',
        draggable: false,
        position: { x: 0, y: 150 },
        data: { columnName: 'Salary', dataType: 'int', tableName: 'employee' },
        type: ECustomNodeTypes.ColumnNode,
        parentNode: 'employee',
        extent: 'parent',
        zIndex: 20,
        expandParent: true
    },
    {
        id: 'designation',
        type: ECustomNodeTypes.TableNode,
        position: { x: 1000, y: 500 },
        data: { tableName: 'Designation' },
        zIndex: 20
    },
    {
        id: 'designation.id',
        draggable: false,
        type: ECustomNodeTypes.ColumnNode,
        position: { x: 0, y: 50 },
        data: {
            columnName: 'Id',
            dataType: 'varchar',
            tableName: 'designation'
        },
        parentNode: 'designation',
        zIndex: 20,
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'designation.position',
        draggable: false,
        type: ECustomNodeTypes.ColumnNode,
        position: { x: 0, y: 100 },
        data: {
            columnName: 'Position',
            dataType: 'varchar',
            tableName: "'designation'"
        },
        zIndex: 20,
        parentNode: 'designation',
        extent: 'parent',
        expandParent: true
    }
];

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
