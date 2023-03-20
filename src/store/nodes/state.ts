import { create } from 'zustand';

import { initialNodes } from '../../components/react-flow/constants';

export const useTables = create((set) => ({
    nodes: initialNodes
}));
