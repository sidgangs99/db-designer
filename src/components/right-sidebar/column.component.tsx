import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import ButtonContainer from '../common/button/container';
import SQLDataTypesDropdown from '../common/sql-types/component';
import { sqlInputType, sqlTypeColor } from '../common/sql-types/constants';
import SwitchContainer from '../common/switch/container';
import TextAreaInput from './textAreaInput';
import TextInput from './textInput';
import { IRightHeaderComponentProps } from './types';

const RightSidebarColumnComponent = (props: IRightHeaderComponentProps) => {
    const {
        node,
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
        onClose,
        onColumnClick
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
    ];

    const { disabled } = constraintsLogic.getDefaultValueDetails();
    const { tableName } = getValues();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            id="editTableColumn"
            className="h-full flex-col space-y-6 py-4"
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
            <div
                className="group group flex h-10 w-full cursor-pointer items-center justify-between rounded-sm border border-grey-main bg-grey-dark px-2 font-semibold text-white hover:border-grey-lighter"
                onClick={() => {
                    onColumnClick(node?.data?.tableId);
                }}
            >
                <p className="flex"> {tableName}</p>
                <HiOutlinePencilSquare className="h-full rounded-sm text-2xl group-hover:text-coral-main" />
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

                {!disabled && (
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
                )}
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
            <div className="flex flex-col space-y-2">
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Additional Info
                </label>
                <TextAreaInput
                    register={register}
                    errors={errors}
                    keyName={'additional.notes'}
                    label={'Notes'}
                />
            </div>
        </form>
    );
};

export default RightSidebarColumnComponent;
