import { CSSProperties } from 'react';
import { Edge, XYPosition } from 'reactflow';
import { ECustomNodeTypes } from '../../components/react-flow/types';
import { defaultValuesOptions } from '../../constants/column.constants';
import { postgresDataTypeInputTypeMapping } from '../../constants/postgres.constants';
import { uuid } from '../../util/helper';
import { INode, INodeData } from './types';

// *****************************
// Creating a node in table
// *****************************
export const newColumnNode = (nodes: INode[], tableId: string): INode[] => {
    const columnNodes: INode[] = nodes.filter(
        (node: INode) => tableId === node.parentNode
    );

    const newNodeData: INodeData = {
        columnName: 'new_column',
        dataType: postgresDataTypeInputTypeMapping[0],
        defaultValue: '',
        tableName: columnNodes[0]?.data?.tableName,
        tableId: tableId
    };

    const newNode: INode = {
        id: uuid(),
        draggable: false,
        data: newNodeData,
        position: { x: 0, y: (columnNodes.length + 1) * 50 },
        parentNode: tableId,
        extent: 'parent',
        type: ECustomNodeTypes.ColumnNode,
        expandParent: true
    };

    return [...nodes, newNode];
};

// *****************************
// Deleting a node in table
// *****************************
const reduceXYPosition = (deletedNode: INode, node: INode): XYPosition => {
    let newPosition: XYPosition = node.position;

    if (
        deletedNode.parentNode === node?.parentNode &&
        deletedNode.position.y < node.position.y
    ) {
        newPosition.y = node.position.y - 50;
    }

    return { ...newPosition };
};

const reduceTableHeight = (deletedNode: INode, node: INode): CSSProperties => {
    let newStyle: any = node.style;

    if (deletedNode.data.tableId === node.id) {
        newStyle.height -= 50;
    }

    return { ...newStyle };
};

export const deleteNodesAndUpdatePosition = (
    nodeId: string,
    nodes: INode[]
) => {
    let deletedNode: INode;
    nodes = nodes.filter((node) => {
        if (node.id === nodeId) deletedNode = node;
        return node.id !== nodeId;
    });

    return nodes.map((node: INode) => ({
        ...node,
        position: reduceXYPosition(deletedNode, node),
        style: reduceTableHeight(deletedNode, node)
    }));
};

// *************************************
// Deleting all edges on table delete
// *************************************
export const deleteEdgesForTable = (
    edges: Edge[],
    nodes: INode[],
    tableId: string
) => {
    const deletedNodeIds = new Set();
    nodes.forEach((node) => {
        if (node.data.tableId === tableId) {
            deletedNodeIds.add(node.id);
        }
    });

    edges = edges.filter(
        (edge) =>
            !(
                deletedNodeIds.has(edge.source) ||
                deletedNodeIds.has(edge.target)
            )
    );
    return [...edges];
};

// *************************************
// Add a new table with custom fields
// *************************************
const defaultTable = (
    tableId: string,
    tableName: string,
    position: XYPosition
): INode => ({
    id: tableId,
    type: ECustomNodeTypes.TableNode,
    position,
    data: {
        tableName,
        tableId
    }
});

const defaultNode = (
    tableId: string,
    tableName: string,
    columnName: string,
    dataType: Record<string, any>,
    yAxis: number
): INode => ({
    id: uuid(),
    draggable: false,
    position: { x: 0, y: yAxis * 50 },
    data: {
        tableName,
        tableId,
        columnName,
        dataType,
        defaultValueOption: defaultValuesOptions[0],
        defaultValue: '',
        constraints: {
            primaryKey: false,
            unique: false,
            notNull: true
        }
    },
    type: ECustomNodeTypes.ColumnNode,
    parentNode: tableId,
    extent: 'parent',
    expandParent: true
});

export const addNewTable = (position: XYPosition) => {
    const tableId = uuid();
    const tableName = 'new_table';
    const columnNameId = 'id';
    const columnNameCreatedAt = 'created_at';
    const columnNameUpdatedAt = 'updated_at';

    return [
        defaultTable(tableId, tableName, position),
        defaultNode(
            tableId,
            tableName,
            columnNameId,
            postgresDataTypeInputTypeMapping[12],
            1
        ),
        defaultNode(
            tableId,
            tableName,
            columnNameCreatedAt,
            postgresDataTypeInputTypeMapping[3],
            2
        ),
        defaultNode(
            tableId,
            tableName,
            columnNameUpdatedAt,
            postgresDataTypeInputTypeMapping[3],
            3
        )
    ];
};