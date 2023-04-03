import { Controller } from 'react-hook-form';
import SQLDataTypesDropdown from '../sql-types/component';
import SwitchContainer from '../switch/container';
import { IRightSidebarComponentProps } from './types';

const RightSidebarComponent = (props: IRightSidebarComponentProps) => {
    const {
        node,
        options,
        watch,
        constraintsLogic,
        setValue,
        errors,
        getInputType,
        getValues,
        handleSubmit,
        onSubmit,
        register,
        control
    } = props;

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="editTableColumn">
            <div className="h-full flex-col space-y-4 border-l border-grey-light py-10 px-2">
                <div className="flex w-full justify-between">
                    <label className="w-full border-b font-semibold">
                        Table
                    </label>
                </div>
                <div className="flex w-full justify-between">
                    <label className="w-1/2">Name:</label>
                    <div className="flex w-1/2 flex-col items-center justify-center">
                        <input
                            {...register('tableName', {
                                required: true,
                                pattern: /^[^\s]+$/
                            })}
                            className="text-bg-white border-b bg-grey-main py-0.5 px-2 font-normal focus:outline-none focus:ring-0"
                        />
                        <p className="text-xs">
                            {errors.tableName?.type === 'required'
                                ? 'This field is required'
                                : errors.tableName?.type === 'pattern'
                                ? 'No spaces allowed'
                                : ''}
                        </p>
                    </div>
                    <div>{errors.inputField?.type}</div>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex w-full border-b">
                        <label>Column</label>
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex w-1/2">
                        <label>Name: </label>
                    </div>
                    <div className="flex w-1/2 flex-col items-center justify-center">
                        <input
                            {...register('columnName', {
                                required: true,
                                pattern: /^[^\s]+$/
                            })}
                            className="border-b py-0.5 px-2 font-normal focus:outline-none focus:ring-0"
                        />
                        <p className="text-xs">
                            {errors.columnName?.type === 'required'
                                ? 'This field is required'
                                : errors.columnName?.type === 'pattern'
                                ? 'No spaces allowed'
                                : ''}
                        </p>
                    </div>
                </div>

                <div className="flex w-full justify-between">
                    <label className="w-1/2 border">Data Type:</label>
                    <div className="flex w-1/2 flex-col items-center justify-center">
                        <SQLDataTypesDropdown
                            getValues={getValues}
                            watch={watch}
                            setValue={setValue}
                            constraintsLogic={constraintsLogic}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col space-y-2 pt-4">
                    <p className="mb-2 border-b text-base ">
                        Column Constraints
                    </p>
                    {options.map(
                        ({
                            label,
                            formValue,
                            defaultValue,
                            disabled,
                            type,
                            disabledTooltip
                        }: any) => (
                            <Controller
                                key={formValue}
                                name={formValue}
                                control={control}
                                defaultValue={defaultValue}
                                render={({ field: { onChange, value } }) => {
                                    if (type === Boolean) {
                                        return (
                                            <SwitchContainer
                                                label={label}
                                                enabled={value}
                                                onChange={(e: any) =>
                                                    onChange(e)
                                                }
                                                isDisabled={disabled}
                                                disabledTooltipMessage={
                                                    disabledTooltip
                                                }
                                            />
                                        );
                                    }

                                    if (
                                        label === 'Default Value' &&
                                        !disabled
                                    ) {
                                        return (
                                            <div className="flex w-full items-center space-x-4">
                                                <label className="w-1/4">
                                                    {label}
                                                </label>
                                                <input
                                                    {...register(formValue, {})}
                                                    type={getInputType()}
                                                    className="w-2/4 rounded-lg border py-1 px-2 uppercase"
                                                />
                                            </div>
                                        );
                                    }

                                    return <></>;
                                }}
                            />
                        )
                    )}
                </div>
            </div>
        </form>
    );
};

export default RightSidebarComponent;
