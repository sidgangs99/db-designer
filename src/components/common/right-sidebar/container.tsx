import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEdges, useNodes } from 'reactflow';
import { useStore } from 'zustand';
import { useLayoutStore } from '../../../store/layout/store';
import { INodeDetails } from '../../../store/nodes/types';
import { useSaveWorkbook } from '../../header/hooks/useSaveWorkbook';
import { ConstraintsLogic } from '../custom-node/helper/constraints-logic';
import { sqlInputType } from '../sql-types/constants';
import RightSidebarColumnComponent from './column.component';
import RightSidebarTableComponent from './table.component';
import { IRightSidebarContainerProps } from './types';

const RightSidebarContainer = (props: IRightSidebarContainerProps) => {
    const nodes = useNodes();
    const edges = useEdges();

    const [node, setNode] = useState<any>({});
    const { data } = node;
    const {
        tableName,
        columnName,
        dataType,
        constraints,
        additional,
        defaultValue
    }: INodeDetails = data || {};

    const [newDataType, setNewDataType] = useState<string>('');
    const [constraintsLogic, setConstraintsLogic] = useState<any>();

    const { openRightSideBar, nodeId, setOpenRightSideBar } =
        useStore(useLayoutStore);

    useEffect(() => {
        const selectedNode = nodes.filter((_node: any) => _node.id === nodeId);
        if (selectedNode.length) {
            setNode(selectedNode[0]);
            console.log(selectedNode[0]);
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
            defaultValue
        }
    });

    useEffect(() => {
        if (node?.data) {
            setNewDataType(dataType);
            setValue('tableName', tableName);
            setValue('columnName', columnName);
            setValue('constraints', constraints);
            setValue('additional', additional);
            setValue('dataType', dataType);
            setValue('defaultValue', defaultValue);
        }
    }, [node]);

    const { errors }: any = formState;

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'dataType') setNewDataType(value?.dataType || '');
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const defaultValueInputType: string = useMemo(
        () => sqlInputType[newDataType],
        [newDataType]
    );

    const { refetch } = useSaveWorkbook();

    const onSubmit: any = (_data: any) => {
        const newNode = { ...node.data, ..._data };
        newNode.onUpdateNode(newNode, node.id);
        setOpenRightSideBar(nodeId);
        refetch();
        console.log('hey');
    };

    const onClose = () => {
        setOpenRightSideBar(nodeId);
    };

    useEffect(() => {
        console.log(nodes);
    }, [nodes]);

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

export default RightSidebarContainer;
