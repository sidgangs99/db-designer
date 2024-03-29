import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { MdOutlineDelete } from 'react-icons/md';

import { sqlTypeColor } from '../../constants/column.constants';
import { postgresDataTypeInputTypeMapping } from '../../constants/postgres.constants';
import useWorkbookStore from '../../store/workbook/state';
import ButtonContainer from '../common/button/container';
import SingleSelectDropdownHookFormContainer from '../common/single-select-dropdown/hookForm.component';
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
        onColumnClick,
        newDefaultValueOption
    } = props;

    const { deleteNode } = useWorkbookStore();
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

    const { defaultValues } = constraintsLogic.getDefaultValueDetails();
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
                    label={'Update'}
                    primary
                    disabled={Object.keys(errors).length !== 0}
                />
                <ButtonContainer onClick={onClose} label={'Close'} secondary />
            </div>

            <div className="group flex h-10 w-full items-center justify-between space-x-2 rounded-sm font-semibold text-white">
                <p className="flex h-full w-5/6 items-center justify-start bg-grey-main px-3">
                    {tableName}
                </p>
                <div
                    className="flex h-full w-1/6 cursor-pointer items-center justify-center bg-grey-dark hover:border hover:border-coral-main hover:text-coral-main"
                    onClick={() => {
                        onColumnClick(node?.data?.tableId);
                    }}
                >
                    <HiOutlinePencilSquare className="cursor-pointer text-2xl hover:text-coral-main" />
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex h-10 w-full items-center justify-between space-x-2 rounded-sm font-semibold text-white">
                    <div className="flex h-10 w-5/6 items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                        Column Details
                    </div>
                    <div
                        className="flex h-full w-1/6 cursor-pointer items-center justify-center bg-grey-dark hover:border hover:border-coral-main hover:text-coral-main"
                        onClick={() => {
                            deleteNode(node?.id);
                            onColumnClick(node?.id);
                        }}
                    >
                        <MdOutlineDelete
                            className={`flex items-center text-2xl`}
                        />
                    </div>
                </div>
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
                        sqlTypeColor[newDataType.type]
                    }`}
                >
                    <label className="flex w-3/12 items-center justify-start">
                        Type :
                    </label>
                    <div className="flex w-8/12 items-center justify-center">
                        <SingleSelectDropdownHookFormContainer
                            setValue={setValue}
                            values={postgresDataTypeInputTypeMapping}
                            keyNameValue={newDataType}
                            keyName={'dataType'}
                            constraintsLogic={constraintsLogic}
                        />
                    </div>
                </div>
                <div
                    className={`flex h-10 w-full items-center justify-between rounded-sm bg-grey-dark px-3 ${
                        sqlTypeColor[newDataType.type]
                    }`}
                >
                    <label className="flex w-3/12 items-center justify-start">
                        Value :
                    </label>
                    <div className="flex w-8/12 items-center justify-center">
                        <SingleSelectDropdownHookFormContainer
                            setValue={setValue}
                            values={defaultValues}
                            keyNameValue={newDefaultValueOption}
                            keyName={'defaultValueOption'}
                            constraintsLogic={constraintsLogic}
                        />
                    </div>
                </div>

                {newDefaultValueOption?.isDefaultValueInputVisible &&
                    (newDataType?.type === 'textarea' &&
                    newDefaultValueOption?.id !== 'expression' ? (
                        <TextAreaInput
                            register={register}
                            errors={errors}
                            keyName="defaultValue"
                            label={'Default'}
                            pattern={newDataType.regex}
                            inputStyle={
                                ['number', 'text'].includes(
                                    defaultValueInputType
                                )
                                    ? 'text-sm'
                                    : 'text-xs'
                            }
                            customStyle={sqlTypeColor[newDataType.type]}
                            placeholder={'none'}
                        />
                    ) : (
                        <TextInput
                            register={register}
                            errors={errors}
                            keyName="defaultValue"
                            label={'Default'}
                            type={
                                newDefaultValueOption?.id === 'expression'
                                    ? 'text'
                                    : defaultValueInputType
                            }
                            pattern={newDefaultValueOption?.id === 'expression'
                            ? '' : newDataType.regex}
                            inputStyle={
                                ['number', 'text'].includes(
                                    defaultValueInputType
                                )
                                    ? 'text-sm'
                                    : 'text-xs'
                            }
                            customStyle={sqlTypeColor[newDataType.type]}
                            placeholder={'none'}
                        />
                    ))}
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
