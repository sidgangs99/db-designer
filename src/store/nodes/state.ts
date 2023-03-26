import { create } from 'zustand';

export const useNodesStore = create((set) => ({
    nodes: [],

    setNodes: (nodes: any) => set((state: any) => ({ ...state, nodes }))
}));
