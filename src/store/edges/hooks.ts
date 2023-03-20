import { useEdges } from './state';

export const useIsASourceEdge = (id: string) => {
    const edges = useEdges((state: any) => state.edges);
    return edges.some((edge: any) => edge.source === id);
};

export const useIsATargetEdge = (id: string) => {
    const edges = useEdges((state: any) => state.edges);
    return edges.some((edge: any) => edge.target === id);
};

