import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import ButtonContainer from '../button/container';
import SQLDataTypesDropdown from '../sql-types/component';
import { sqlInputType, sqlTypeColor } from '../sql-types/constants';
import SwitchContainer from '../switch/container';
import TextInput from './textInput';
import { IRightSidebarComponentProps } from './types';

const RightSidebarComponent = (props: IRightSidebarComponentProps) => {
    const {
        watch,
        constraintsLogic,
        setValue,
        errors,
        defaultValueInputType,
        getValues,
        handleSubmit,
        onSubmit,
        register,
        control,
        newDataType,
        onClose
    } = props;

    const autoIncrement = useCallback(
        () => constraintsLogic?.getIsAutoIncrementDetails(newDataType),
        [newDataType]
    );

    const options: any[] = [
        constraintsLogic.getPrimaryKeyDetails(),
        constraintsLogic.getIsForeignKeyDetails(),
        constraintsLogic.getIsNotNullDetails(),
        constraintsLogic.getIsUniqueDetails(),
        autoIncrement()
        // constraintsLogic.getDefaultValueDetails()
    ];

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            id="editTableColumn"
            className="h-full flex-col space-y-6 border-l-8 border-grey-light py-4 px-2"
        >
            <div className="flex w-full justify-between">
                <ButtonContainer
                    type={'submit'}
                    form={'editTableColumn'}
                    label={'Save'}
                    primary
                />
                <ButtonContainer onClick={onClose} label={'Close'} secondary />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Table Details
                </label>
                <TextInput
                    register={register}
                    errors={errors}
                    keyName="tableName"
                    label={'Name'}
                    pattern={/^[^\s]+$/}
                    required
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Column Details
                </label>
                <TextInput
                    register={register}
                    errors={errors}
                    keyName="columnName"
                    label={'Name'}
                    pattern={/^[^\s]+$/}
                    required
                />

                <div
                    className={`flex h-10 w-full items-center justify-between rounded-sm bg-grey-dark px-3 ${
                        sqlTypeColor[sqlInputType[newDataType]]
                    }`}
                >
                    <label className="flex w-3/12 items-center justify-start">
                        Type :
                    </label>
                    <div className="flex w-8/12 items-center justify-center">
                        <SQLDataTypesDropdown
                            getValues={getValues}
                            watch={watch}
                            setValue={setValue}
                            constraintsLogic={constraintsLogic}
                        />
                    </div>
                </div>

                <TextInput
                    register={register}
                    errors={errors}
                    keyName="defaultValue"
                    label={'Default'}
                    type={defaultValueInputType}
                    inputStyle={
                        ['number', 'text'].includes(defaultValueInputType)
                            ? 'text-sm'
                            : 'text-xs'
                    }
                    customStyle={sqlTypeColor[sqlInputType[newDataType]]}
                    placeholder={'none'}
                />
            </div>
            <div className="flex w-full flex-col space-y-2">
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Column Constraints
                </label>
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
                            render={({ field: { onChange, value } }) => (
                                <SwitchContainer
                                    label={label}
                                    enabled={value}
                                    onChange={(e: any) => onChange(e)}
                                    isDisabled={disabled}
                                    disabledTooltipMessage={disabledTooltip}
                                />
                            )}
                        />
                    )
                )}
            </div>
        </form>
    );
};

export default RightSidebarComponent;
