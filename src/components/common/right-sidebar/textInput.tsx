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
        required
    } = props;
    return (
        <div
            className={`flex h-10 w-full items-center justify-between rounded-sm bg-grey-dark px-3 ${customStyle}`}
        >
            <label className="flex w-3/12">{label} :</label>
            <div className="flex w-8/12 flex-col items-center justify-center">
                <input
                    {...register(keyName, {
                        required: required,
                        pattern
                    })}
                    type={type}
                    className={`w-full border-b bg-transparent py-0.5 px-2 text-sm font-normal focus:outline-none focus:ring-0 ${inputStyle}`}
                />
                {/* <p className="text-xs">
                    {errors[keyName]?.type === 'required'
                        ? 'This field is required'
                        : errors[keyName]?.type === 'pattern'
                        ? 'No spaces allowed'
                        : ''}
                </p> */}
            </div>
        </div>
    );
}
