import { create } from 'zustand';

export const useEdgesStore = create((set) => ({
    edges: [],

    setEdges: (edges: any) => set((state: any) => ({ ...state, edges }))
}));
