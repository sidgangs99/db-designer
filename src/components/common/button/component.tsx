import { IButtonComponentProps } from './types';

const ButtonComponent = (props: IButtonComponentProps) => {
    const { onClick, label, form, type = 'button' } = props;
    return (
        <button
            type={type}
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm text-red-900 duration-300 hover:bg-red-200"
            onClick={onClick}
            form={form}
        >
            {label}
        </button>
    );
};

export default ButtonComponent;
