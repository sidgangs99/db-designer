import { create } from 'zustand';

import { initialEdges } from '../../components/react-flow/constants';

export const useEdgesStore = create((set) => ({
    edges: initialEdges,

    removeEdge: (id: string) =>
        set(({ edges }: any) => ({
            edges: edges.filter((edge: any) => edge.id !== id)
        })),

    addEdge: (edge: object) =>
        set(({ edges }: any) => ({ edges: [...edges, edge] }))
}));
