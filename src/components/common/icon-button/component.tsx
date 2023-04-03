import { IIconButtonComponentProps } from './types';

const IconButtonComponent = (props: IIconButtonComponentProps) => {
    const {
        onClick,
        label,
        form,
        type = 'button',
        disabled = false,
        Icon,
        onDragStart,
        draggable,
        className
    } = props;
    return (
        <button
            className={`flex items-center justify-center space-x-1.5 rounded-md border border-coral-darker px-3 py-1 text-sm text-coral-darker hover:bg-gradient-to-tl hover:from-coral-darkest hover:via-coral-dark hover:to-coral-darkest hover:text-black dark:hover:shadow-md dark:hover:shadow-coral-dark ${
                disabled && 'cursor-not-allowed'
            } ${className}`}
            type={type}
            onClick={onClick}
            form={form}
            disabled={disabled}
            onDragStart={onDragStart}
            draggable={draggable}
        >
            <div>
                <Icon className="text-lg" />
            </div>
            <div>{label}</div>
        </button>
    );
};

export default IconButtonComponent;
