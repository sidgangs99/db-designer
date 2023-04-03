import { Switch } from '@headlessui/react';
import { useStore } from 'zustand';
import { darkTheme } from '../../../store/darkMode/constants';
import { useThemeStore } from '../../../store/darkMode/state';

export default function DarkModeBulbComponent(props: any) {
    const { onClick } = props;

    const { theme }: any = useStore(useThemeStore);
    const enabled = theme === darkTheme ? true : false;

    return (
        <Switch
            checked={enabled}
            onChange={onClick}
            className={`${
                enabled
                    ? 'bg-gradient-to-r from-yellow-400'
                    : 'bg-gradient-to-l from-stone-900'
            } relative inline-flex hidden h-6 w-11 items-center rounded-full border border-neutral-500`}
        >
            <span
                className={`${
                    enabled
                        ? 'translate-x-6 bg-yellow-400'
                        : 'translate-x-1 bg-stone-800'
                } inline-block h-4 w-4 transform rounded-full transition`}
            />
        </Switch>
    );
}
