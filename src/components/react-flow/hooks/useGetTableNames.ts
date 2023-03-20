import { useTables } from '../../../store/nodes/state';

export const useGetTableNames = () => {
    const nodes = useTables((state: any) => state.tables);
    const tableNames: string[] = [];
    nodes.forEach((node: any) => {
        const { id } = node;
        if (id.split('.').length === 1) {
            tableNames.push(id);
        }
    });

    return tableNames;
};
