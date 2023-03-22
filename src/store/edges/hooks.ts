import { useEdgesStore } from './state';

export const useIsASourceEdge = (id: string) => {
    const edges = useEdgesStore((state: any) => state.edges);
    return edges.some((edge: any) => edge.source === id);
};

export const useIsATargetEdge = (id: string) => {
    const edges = useEdgesStore((state: any) => state.edges);
    return edges.some((edge: any) => edge.target === id);
};

export const useIsASourceOrTargetEdge = (id: string) => {
    const edges = useEdgesStore((state: any) => state.edges);
    return edges.some((edge: any) => edge.target === id || edge.source === id);
};
