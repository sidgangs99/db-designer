import { IButtonComponentProps } from './types';

const ButtonComponent = (props: IButtonComponentProps) => {
    const { onClick, label, form, type = 'button', disabled = false } = props;
    return (
        <button
            type={type}
            className={`flex justify-center rounded-md bg-white px-4 py-1 text-sm text-chelsea-cucumber-900 shadow-2xl ${
                disabled && 'cursor-not-allowed'
            }`}
            onClick={onClick}
            form={form}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default ButtonComponent;
