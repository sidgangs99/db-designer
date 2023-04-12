import { ECustomNodeTypes } from '../../components/react-flow/types';
import { uuid } from '../../util/helper';
import { INode, INodeData } from './types';

export const newColumnNode = (nodes: INode[], tableId: string): INode[] => {
    const columnNodes: INode[] = nodes.filter(
        (node: INode) => tableId === node.parentNode
    );

    const newNodeData: INodeData = {
        columnName: 'new_column',
        dataType: 'varchar',
        defaultValue: '',
        tableName: columnNodes[0]?.data?.tableName,
        tableId: tableId
    };

    const newNode: INode = {
        id: uuid(),
        draggable: false,
        data: newNodeData,
        position: { x: 0, y: columnNodes.length * 50 },
        parentNode: tableId,
        extent: 'parent',
        type: ECustomNodeTypes.ColumnNode,
        expandParent: true
    };

    return [...nodes, newNode];
};
