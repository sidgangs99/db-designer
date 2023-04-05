import { IIconComponentProps } from './types';

export default function IconComponent({ Icon, onClick }: IIconComponentProps) {
    return (
        <div
            className="border-coral-darkest hover:from-coral-darkest hover:to-coral-darkest text-coral-darkest flex cursor-pointer items-center justify-center space-x-1.5 rounded-md border bg-gradient-to-tl px-2 py-1 text-sm shadow-2xl hover:via-coral-main hover:text-black"
            onClick={onClick}
        >
            <Icon className="text-lg" />
        </div>
    );
}
