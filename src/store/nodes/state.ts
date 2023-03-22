import { create } from 'zustand';
import { ECustomNodeTypes } from '../../components/react-flow/types';
import { INode } from './types';

export const initialNodes: INode[] = [
    {
        id: 'employee',
        position: { x: 500, y: 500 },
        data: {
            tableName: 'employee',
            tableStyle:
                'flex h-full w-full justify-center rounded-md bg-chelsea-cucumber-100 py-2 px-2 text-lg font-bold uppercase text-chelsea-cucumber-600 shadow-lg outline-2 outline-stone-400'
        },
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
            tableName: 'employee'
        },
        parentNode: 'employee',
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
        expandParent: true
    },
    {
        id: 'employee.add',
        draggable: false,
        position: { x: 0, y: 200 },
        data: { tableName: 'employee' },
        type: ECustomNodeTypes.AddColumnNode,
        parentNode: 'employee',
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'designation',
        type: ECustomNodeTypes.TableNode,
        position: { x: 1000, y: 500 },
        data: {
            tableName: 'designation',
            tableStyle:
                'flex h-full w-full justify-center rounded-md bg-chelsea-cucumber-100 py-2 px-2 text-lg font-bold uppercase text-chelsea-cucumber-600 shadow-lg outline-2 outline-stone-400'
        }
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
            tableName: 'designation'
        },
        parentNode: 'designation',
        extent: 'parent',
        expandParent: true
    },
    {
        id: 'designation.add',
        draggable: false,
        position: { x: 0, y: 150 },
        data: { tableName: 'designation' },
        type: ECustomNodeTypes.AddColumnNode,
        parentNode: 'designation',
        extent: 'parent',
        expandParent: true
    }
];

export const useNodesStore = create((set) => ({
    nodes: initialNodes
}));
