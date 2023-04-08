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
            className={`flex items-center justify-center space-x-1.5 rounded-md border border-grey-main px-2 py-1 text-sm text-gray-100 hover:border-coral-light hover:text-coral-light ${
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
                <Icon className="h-4 w-4 text-lg" />
            </div>
            <div>{label}</div>
        </button>
    );
};

export default IconButtonComponent;
