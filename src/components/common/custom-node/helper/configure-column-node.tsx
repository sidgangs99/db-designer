import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { INodeDetails } from '../../../../store/nodes/types';
import SQLDataTypesDropdown from '../../sql-types/component';
import { sqlInputType } from '../../sql-types/constants';
import SwitchContainer from '../../switch/container';
import { ConstraintsLogic } from './constraints-logic';

// Header
export function ConfigureColumnNodeHeader({ data }: { data: INodeDetails }) {
    const { columnName, tableName } = data;
    return (
        <div className="flex space-x-1 text-chelsea-cucumber-600">
            <p className="">{tableName}</p>
            <p className="px-3">{'->'}</p>
            <p className="">{columnName}</p>
        </div>
    );
}

interface IConfigureColumnNodeBodyP {
    data: INodeDetails;
    id: string;
    setOpenModal: Function;
    edges: any;
}

// Body
export function ConfigureColumnNodeBody(props: IConfigureColumnNodeBodyP) {
    const { data, id, setOpenModal, edges } = props;
    const { tableName, columnName, dataType, constraints } = data;
    const constraintsLogic = new ConstraintsLogic(id, data, edges);

    const [newDataType, setNewDataType] = useState<string>(dataType);

    const { control, register, watch, getValues, setValue, handleSubmit } =
        useForm({
            mode: 'onChange',
            defaultValues: {
                tableName,
                columnName,
                dataType,
                'constraints.defaultValue': constraints.defaultValue,
                'constraints.primaryKey': constraints.primaryKey
            }
        });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'dataType') setNewDataType(value?.dataType || '');
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const autoIncrement = useCallback(
        () => constraintsLogic.getIsAutoIncrementDetails(newDataType),
        [newDataType]
    );

    const getInputType = useCallback(() => {
        return sqlInputType[newDataType];
    }, [newDataType]);

    const onSubmit: any = (_data: any) => {
        const newNode = { ...data, ..._data };
        setOpenModal(false);
        newNode.onUpdateNode(newNode, id);
    };

    const options = [
        constraintsLogic.getPrimaryKeyDetails(),
        constraintsLogic.getIsForeignKeyDetails(),
        constraintsLogic.getIsNotNullDetails(),
        constraintsLogic.getIsUniqueDetails(),
        autoIncrement(),
        constraintsLogic.getDefaultValueDetails()
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="editTableColumn">
            <div className="flex-col space-y-4">
                <div className="flex w-full justify-between">
                    <label className="w-1/2 font-semibold">Table Name: </label>
                    <input
                        {...register('tableName', { required: true })}
                        className="w-1/2 rounded-lg border border-chelsea-cucumber-400 py-1 px-2 font-semibold outline-chelsea-cucumber-400"
                    />
                </div>
                <div className="flex w-full justify-between">
                    <label className="w-1/2">Column Name: </label>
                    <input
                        {...register('columnName', { required: true })}
                        className="w-1/2 rounded-lg border border-chelsea-cucumber-400 py-1 px-2 outline-chelsea-cucumber-400"
                    />
                </div>
                <div className="flex w-full justify-between">
                    <label className="w-1/2">Data Type: </label>
                    <div className="w-1/2">
                        <SQLDataTypesDropdown
                            getValues={getValues}
                            watch={watch}
                            setValue={setValue}
                            constraintsLogic={constraintsLogic}
                        />
                    </div>
                </div>
                <div className="flex w-full flex-col space-y-2 pt-4">
                    <p className="mb-2 border-b text-base text-chelsea-cucumber-600 ">
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
                                                    className="w-2/4 rounded-lg border border-chelsea-cucumber-400 py-1 px-2 uppercase outline-chelsea-cucumber-400"
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
}
