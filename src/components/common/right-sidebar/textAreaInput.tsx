export default function TextAreaInput(props: {
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
    return (
        <div
            className={`flex w-full flex-col items-center justify-between space-y-2 rounded-sm bg-grey-dark px-3 ${customStyle}`}
        >
            <label className="flex w-full">{label}</label>
            <div className="flex w-full flex-col items-center justify-center">
                <textarea
                    {...register(keyName, {
                        required: required,
                        pattern
                    })}
                    type={type}
                    placeholder={placeholder}
                    className={`mx-4 mb-4 h-96 w-full resize-none border border-grey-light bg-grey-dark p-2 px-2 text-sm font-normal focus:outline-none focus:ring-0 ${inputStyle}`}
                />
            </div>
        </div>
    );
}
