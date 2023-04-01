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
            className={`flex items-center justify-center space-x-1.5 rounded-md border border-black px-3 py-1 text-sm shadow-2xl dark:border-slate-200 ${
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
                <Icon className="text-lg text-slate-main dark:text-slate-200" />
            </div>
            <div>{label}</div>
        </button>
    );
};

export default IconButtonComponent;
