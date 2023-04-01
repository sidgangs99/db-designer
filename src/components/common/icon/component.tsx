import { IIconComponentProps } from './types';

export default function IconComponent({ Icon, onClick }: IIconComponentProps) {
    return (
        <div
            className="flex items-center justify-center space-x-1.5 rounded-md border border-chelsea-cucumber-200 bg-white px-2 py-1 text-sm text-chelsea-cucumber-900 shadow-2xl hover:bg-chelsea-cucumber-100 dark:bg-slate-800 "
            onClick={onClick}
        >
            <Icon className="text-lg dark:fill-chelsea-cucumber-200" />
        </div>
    );
}
