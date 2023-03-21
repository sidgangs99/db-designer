export const useGetTableNameFromNodeName = (id: string) => {
    return id.split('.')[0];
};
