import { IButtonComponentProps } from './types';

const ButtonComponent = (props: IButtonComponentProps) => {
    const { onClick, label, form, type = 'button', disabled = false } = props;
    return (
        <button
            type={type}
            className={`flex justify-center rounded-md border border-black px-4 py-1 text-sm shadow-2xl dark:border-slate-200 ${
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
