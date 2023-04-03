import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEdges, useNodes } from 'reactflow';
import { useStore } from 'zustand';
import { useLayoutStore } from '../../../store/layout/store';
import { ConstraintsLogic } from '../custom-node/helper/constraints-logic';
import { sqlInputType } from '../sql-types/constants';
import RightSidebarComponent from './component';
import { IRightSidebarContainerProps } from './types';

const RightSidebarContainer = (props: IRightSidebarContainerProps) => {
    const [node, setNode] = useState<any>({});

    const [newDataType, setNewDataType] = useState<string>('');
    const [constraintsLogic, setConstraintsLogic] = useState<any>();

    const { openRightSideBar, nodeId } = useStore(useLayoutStore);

    const nodes = useNodes();
    const edges = useEdges();

    const { data } = node;
    const { tableName, columnName, dataType, constraints } = data || {};

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

    useEffect(() => {
        if (node?.data) setNewDataType(node?.data?.dataType);
    }, [node]);

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
            'constraints.defaultValue': constraints?.defaultValue,
            'constraints.primaryKey': constraints?.primaryKey
        }
    });

    const { errors }: any = formState;
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'dataType') setNewDataType(value?.dataType || '');
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const autoIncrement = useCallback(
        () => constraintsLogic?.getIsAutoIncrementDetails(newDataType),
        [newDataType]
    );

    const getInputType = useCallback(() => {
        return sqlInputType[newDataType];
    }, [newDataType]);

    const onSubmit: any = (_data: any) => {
        const newNode = { ...node.data, ..._data };
        newNode.onUpdateNode(newNode, node.id);
    };

    let options: any[] = [];

    useEffect(() => {
        if (constraintsLogic)
            options = [
                constraintsLogic.getPrimaryKeyDetails(),
                constraintsLogic.getIsForeignKeyDetails(),
                constraintsLogic.getIsNotNullDetails(),
                constraintsLogic.getIsUniqueDetails(),
                autoIncrement(),
                constraintsLogic.getDefaultValueDetails()
            ];
    }, [constraintsLogic]);

    return openRightSideBar && node?.data ? (
        <RightSidebarComponent
            {...props}
            node={node}
            control={control}
            options={options}
            watch={watch}
            constraintsLogic={constraintsLogic}
            setValue={setValue}
            errors={errors}
            getInputType={getInputType}
            getValues={getValues}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
        />
    ) : (
        <></>
    );
};

export default RightSidebarContainer;
