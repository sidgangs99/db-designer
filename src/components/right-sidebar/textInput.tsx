import { useCallback } from 'react';
import { Tooltip } from 'react-tooltip';

export default function TextInput(props: {
    register: any;
    errors: any;
    keyName: string;
    label: string;
    type?: string;
    inputStyle?: string;
    customStyle?: string;
    pattern?: RegExp;
    required?: boolean;
    placeholder?: string;
}) {
    const {
        register,
        errors,
        keyName,
        label,
        type,
        inputStyle,
        customStyle,
        pattern,
        required,
        placeholder
    } = props;

    const isTooltipVisible = useCallback(
        () => Object.keys(errors[keyName] || {}).length !== 0,
        [errors]
    );

    return (
        <div
            className={`flex h-10 w-full items-center justify-between rounded-sm bg-grey-dark px-3 ${customStyle}`}
        >
            <label className="flex w-3/12">{label} :</label>
            <div className="flex w-8/12 items-center justify-center">
                <input
                    {...register(keyName, {
                        required: required,
                        pattern
                    })}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full border-b bg-transparent px-2 py-0.5 text-sm font-normal focus:outline-none focus:ring-0 ${inputStyle} `}
                    data-tooltip-id={`tooltip-${label}-${keyName}`}
                    data-tooltip-content={
                        label === 'Name'
                            ? 'No space allowed'
                            : 'Invalid input data type'
                    }
                />
                <Tooltip
                    id={`tooltip-${label}-${keyName}`}
                    place="bottom"
                    className="bg-coral-light px-6 py-0 align-middle text-black"
                    isOpen={isTooltipVisible()}
                />
            </div>
        </div>
    );
}
