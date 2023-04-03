import { IIconComponentProps } from './types';

export default function IconComponent({ Icon, onClick }: IIconComponentProps) {
    return (
        <div
            className="flex cursor-pointer items-center justify-center space-x-1.5 rounded-md border border-coral-darkest bg-gradient-to-tl px-2 py-1 text-sm shadow-2xl hover:from-coral-darkest hover:via-coral-main hover:to-coral-darkest dark:text-coral-darkest hover:dark:text-black"
            onClick={onClick}
        >
            <Icon className="text-lg" />
        </div>
    );
}
