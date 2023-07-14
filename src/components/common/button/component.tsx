import { IButtonComponentProps } from './types';

const ButtonComponent = (props: IButtonComponentProps) => {
    const {
        onClick,
        label,
        form,
        type = 'button',
        disabled = false,
        primary = false,
        secondary = false,
        className
    } = props;
    return (
        <button
            type={type}
            className={`flex justify-center rounded-md border bg-grey-darker px-2 py-0.5 text-xs md:px-4 md:py-1 md:text-sm ${
                disabled && 'cursor-not-allowed'
            } ${
                primary &&
                'border-grey-light text-coral-light hover:border-coral-main hover:bg-coral-lighter hover:bg-opacity-10 hover:text-coral-main '
            } ${
                secondary &&
                'border-grey-main text-yellow-light hover:border-yellow-main  hover:bg-yellow-200 hover:bg-opacity-10'
            } ${className}`}
            onClick={onClick}
            form={form}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default ButtonComponent;
