import { Edge, MarkerType, Node, Position } from 'reactflow';
import CustomColumnNodeComponent from '../common/customNode/column-node';
import CustomTableNodeComponent from '../common/customNode/table-node';
import { ECustomNodeTypes } from './types';

export const initialNodes: Node<any, string | undefined>[] = [
    {
        id: 'employee',
        position: { x: 500, y: 500 },
        data: { tableName: 'Employee' },
        type: ECustomNodeTypes.TableNode
    },
    {
        id: 'employee.name',
        draggable: false,
        position: { x: 0, y: 50 },
        data: {
            name: 'Name of empoloyeeee sc lBDCDSHJ FVDJSVHJSD SJDAVJ',
            dataType: 'varchar'
        },
        sourcePosition: Position.Right,
        parentNode: 'employee',
        extent: 'parent',
        type: ECustomNodeTypes.ColumnNode,
        expandParent: true
    },
    {
        id: 'employee.id',
        draggable: false,
        position: { x: 0, y: 100 },
        data: { name: 'Id', dataType: 'varchar', refSource: true },
        parentNode: 'employee',
        type: ECustomNodeTypes.ColumnNode,
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'employee.salary',
        draggable: false,
        position: { x: 0, y: 150 },
        data: { name: 'Salary', dataType: 'int' },
        type: ECustomNodeTypes.ColumnNode,
        parentNode: 'employee',
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'designation',
        type: ECustomNodeTypes.TableNode,
        position: { x: 1000, y: 500 },
        data: { tableName: 'Designation' }
    },
    {
        id: 'designation.employeeId',
        draggable: false,
        type: ECustomNodeTypes.ColumnNode,
        position: { x: 0, y: 50 },
        data: { name: 'Id', dataType: 'varchar', refTarget: true },
        parentNode: 'designation',
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'designation.position',
        draggable: false,
        type: ECustomNodeTypes.ColumnNode,
        position: { x: 0, y: 100 },
        data: { name: 'Position', dataType: 'varchar' },
        parentNode: 'designation',
        extent: 'parent',
        expandParent: true
    }
];

export const initialEdges: Edge<any>[] = [
    {
        id: 'employee.id-designation.employeeId',
        source: 'employee.id',
        target: 'designation.employeeId',
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
        zIndex: 10
    }
];

export const nodeTypes = {
    [ECustomNodeTypes.TableNode]: CustomTableNodeComponent,
    [ECustomNodeTypes.ColumnNode]: CustomColumnNodeComponent
};
