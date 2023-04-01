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
        buttonClassName
    } = props;
    return (
        <button
            className={`flex items-center justify-center space-x-1.5 rounded-md border border-chelsea-cucumber-200 bg-white px-2 py-1 text-sm text-chelsea-cucumber-900 shadow-2xl hover:border-chelsea-cucumber-800 hover:bg-chelsea-cucumber-100 ${
                disabled && 'cursor-not-allowed'
            } ${buttonClassName}`}
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
