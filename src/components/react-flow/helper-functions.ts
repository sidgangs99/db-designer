import { INode, ITableData } from '../../store/nodes/types';
import { uuid } from '../../util/helper';

export const isValidEdge = (source: string, target: string) => {
    const sourceDb = source.split('.')[0];
    const targetDb = target.split('.')[0];
    return sourceDb !== targetDb;
};

export const generateNewNode = (data: ITableData, oldNode: INode) => {
    const { columnName, dataType, tableName } = data;
    const { position, type, zIndex, parentNode, extent, expandParent } =
        oldNode;

    return {
        id: uuid(),
        draggable: false,
        type,
        position: position,
        data: { columnName, dataType, tableName },
        zIndex,
        parentNode,
        extent,
        expandParent
    };
};
