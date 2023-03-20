export const isValidEdge = (source: string, target: string) => {
    const sourceDb = source.split('.')[0];
    const targetDb = target.split('.')[0];
    return sourceDb !== targetDb;
};
