import { create } from 'zustand';

import { ECustomNodeTypes } from '../../components/react-flow/types';
import { INode, ITableData } from './types';

export const initialNodes: INode[] = [
    {
        id: 'employee',
        position: { x: 500, y: 500 },
        zIndex: 20,
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
        data: {
            tableName: 'Designation',
            tableStyle:
                'flex h-full w-full justify-center rounded-md bg-chelsea-cucumber-100 py-2 px-2 text-lg font-bold uppercase text-chelsea-cucumber-600 shadow-lg outline-2 outline-stone-400'
        },
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

export const useNodes = create((set) => ({
    nodes: initialNodes,

    updateNode: (data: ITableData, id: string) =>
        set(({ nodes }: any) => {
            nodes.forEach((_node: INode) => {
                if (_node.id === id) {
                    _node.data = data;
                }
            });
            return { nodes: [...nodes] };
        })
}));
