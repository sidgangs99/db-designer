import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { defaultValuesOptions } from '../../constants/column.constants';
import { postgresDataTypeInputTypeMapping } from '../../constants/postgres.constants';
import { useLayoutStore } from '../../store/layout/store';
import useWorkbookStore from '../../store/workbook/state';
import { INodeData } from '../../store/workbook/types';
import { ConstraintsLogic } from '../../util/constraints-logic';
import { ECustomNodeTypes } from '../react-flow/types';
import RightSidebarColumnComponent from './column.component';
import RightSidebarTableComponent from './table.component';
import { IRightHeaderContainerProps } from './types';

const RightHeaderContainer = (props: IRightHeaderContainerProps) => {
    const { nodes, edges, updateNodeData } = useWorkbookStore();

    const [node, setNode] = useState<any>({});
    const { data } = node;
    const {
        tableName,
        columnName,
        dataType = postgresDataTypeInputTypeMapping[0],
        constraints,
        additional,
        defaultValue = '',
        defaultValueOption = defaultValuesOptions[0]
    }: INodeData = data || {};

    const [newDataType, setNewDataType] = useState<Record<string, any>>({});
    const [newDefaultValueOption, setNewDefaultValueOption] = useState<Record<string, any>>({});
    const [constraintsLogic, setConstraintsLogic] = useState<any>();

    const { openRightSideBar, nodeId, setOpenRightSideBar } = useLayoutStore();

    useEffect(() => {
        const selectedNode = nodes.filter((_node: any) => _node.id === nodeId);
        if (selectedNode.length) {
            setNode(selectedNode[0]);
            setConstraintsLogic(
                new ConstraintsLogic(
                    selectedNode[0].id,
                    selectedNode[0].data,
                    edges
                )
            );
        }
    }, [nodeId]);

    const {
        control,
        register,
        watch,
        getValues,
        setValue,
        handleSubmit,
        formState
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            tableName,
            columnName,
            dataType,
            constraints,
            additional,
            defaultValue,
            defaultValueOption
        }
    });

    useEffect(() => {
        if (node?.data) {
            setNewDefaultValueOption(defaultValueOption)
            setNewDataType(dataType);
            setValue('tableName', tableName);
            setValue('columnName', columnName);
            setValue('constraints', constraints);
            setValue('additional', additional);
            setValue('dataType', dataType);
            setValue('defaultValue', defaultValue);
            setValue('defaultValueOption', defaultValueOption);
        }
    }, [node]);

    useEffect(() => {
        constraintsLogic?.setDataType(newDataType);
        if (newDataType?.id?.split('.')[1] === 'serial') {
            setValue('constraints.autoIncrement', true);
        } else {
            setValue('constraints.autoIncrement', false);
        }
    }, [newDataType]);

    useEffect(() => {
        constraintsLogic?.setDefaultValueOption(newDefaultValueOption);
    }, [newDefaultValueOption]);

    const { errors }: any = formState;

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'dataType') setNewDataType(value?.dataType || {});
            else if(name === 'defaultValueOption') setNewDefaultValueOption(value?.defaultValueOption || {})
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const defaultValueInputType: string = useMemo(
        () => newDataType?.type,
        [newDataType]
    );

    const onSubmit: any = (_data: any) => {
        const newNodeData = { ...node.data, ..._data };
        updateNodeData(newNodeData, node.id);
        setOpenRightSideBar(
            node?.type === ECustomNodeTypes.ColumnNode
                ? node?.parentNode
                : node?.id
        );
    };

    const onClose = () => {
        setOpenRightSideBar(nodeId);
    };

    const columns = useMemo(
        () =>
            nodes.filter(
                ({ data }: any) =>
                    data?.tableId === node?.id && data?.columnName
            ),
        [node, nodes]
    );

    const onColumnClick = (id: string) => {
        setOpenRightSideBar(id);
    };

    return openRightSideBar && node?.data ? (
        node?.data?.columnName ? (
            <RightSidebarColumnComponent
                {...props}
                node={node}
                control={control}
                watch={watch}
                constraintsLogic={constraintsLogic}
                setValue={setValue}
                errors={errors}
                defaultValueInputType={defaultValueInputType}
                getValues={getValues}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                newDataType={newDataType}
                onClose={onClose}
                onColumnClick={onColumnClick}
                newDefaultValueOption={newDefaultValueOption}
            />
        ) : (
            <RightSidebarTableComponent
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                onClose={onClose}
                errors={errors}
                node={node}
                columns={columns}
                onColumnClick={onColumnClick}
            />
        )
    ) : (
        <></>
    );
};

export default RightHeaderContainer;
