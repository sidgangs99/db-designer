import { IButtonComponentProps } from './types';

const ButtonComponent = (props: IButtonComponentProps) => {
    const { onClick, label, form, type = 'button', disabled = false } = props;
    return (
        <button
            type={type}
            className={`flex justify-center rounded-md border border-black px-4 py-1 text-sm text-black hover:text-black dark:border-sea-main dark:bg-gradient-to-br dark:text-sea-main dark:hover:from-sea-darkest dark:hover:via-sea-main dark:hover:to-sea-darker dark:hover:text-black ${
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
