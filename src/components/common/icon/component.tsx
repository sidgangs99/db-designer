import { IIconComponentProps } from './types';

export default function IconComponent({ Icon, onClick }: IIconComponentProps) {
    return (
        <div
            className="bg-sea-lighter flex cursor-pointer items-center justify-center space-x-1.5 rounded-md border border-sea-dark px-2 py-1 text-sm shadow-2xl hover:bg-sea-light dark:border-slate-200 dark:hover:bg-sea-darkest"
            onClick={onClick}
        >
            <Icon className="fill-sea-darkest text-lg dark:fill-sea-light" />
        </div>
    );
}
