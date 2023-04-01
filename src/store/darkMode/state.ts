import { create } from 'zustand';
import { darkTheme } from './constants';

export const useThemeStore = create((set) => ({
    theme: darkTheme,

    updateTheme: (updateTheme: string) =>
        set((state: any) => {
            if (updateTheme !== state.theme) {
                if (updateTheme === darkTheme)
                    document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
            }
            return {
                ...state,
                theme: updateTheme
            };
        })
}));
