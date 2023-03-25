import { IButtonComponentProps } from './types';

const ButtonComponent = (props: IButtonComponentProps) => {
    const { onClick, label, form, type = 'button', disabled = false } = props;
    return (
        <button
            type={type}
            className={`flex justify-center rounded-md border border-chelsea-cucumber-200 bg-white px-4 py-1 text-sm text-chelsea-cucumber-900 shadow-2xl hover:bg-chelsea-cucumber-100 ${
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
