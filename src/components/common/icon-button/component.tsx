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
            className={`flex items-center justify-center space-x-1.5 rounded-md border border-grey-main px-3 py-1 text-sm text-coral-main hover:border-coral-main ${
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
