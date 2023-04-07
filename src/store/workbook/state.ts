import { create } from 'zustand';

export const useWorkbook = create((set) => ({
    saveWorkbookQueryCount: 0,

    incrementSaveWorkbookQueryCount: () =>
        set((state: any) => ({
            saveWorkbookQueryCount: state.saveWorkbookQueryCount + 1
        }))
}));
