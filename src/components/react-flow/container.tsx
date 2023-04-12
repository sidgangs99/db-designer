import { useCallback, useEffect, useRef, useState } from 'react';
import { useEdgesState, useNodesState } from 'reactflow';

import { useEdgesStore } from '../../store/edges/state';
import { useNodesStore } from '../../store/nodes/state';
import { INode } from '../../store/workbook/types';
import { uuid } from '../../util/helper';
import { useSaveWorkbook } from '../hooks/useSaveWorkbook';
import ReactFlowComponent from './component';
import { newEdge } from './constants';
import { isValidEdge } from './helper-functions';
import { ECustomNodeTypes } from './types';

export default function ReactFlowContainer() {
    const { nodes: nodesState } = useNodesStore((state: any) => state);
    const { edges: edgesState } = useEdgesStore((state: any) => state);

    const [nodes, setNodes, onNodesChange] = useNodesState(nodesState);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState);

    useSaveWorkbook();

    const addEdge = (newEdge: any) => {
        setEdges((_edges: any) => [..._edges, newEdge]);
    };

    useEffect(() => {
        setNodes((_nodes: any) => {
            return _nodes.map((_node: INode) => ({
                ..._node,
                data: {
                    ..._node.data
                }
            }));
        });
    }, []);

    const onConnect = useCallback((params: any) => {
        const { source, target } = params;
        const edge: any = newEdge(source, target);

        if (isValidEdge(source, target)) {
            addEdge(edge);
        } else {
            console.error(
                'Adding Primary key to same table is not possible, please brush up your basics ;)'
            );
        }
    }, []);

    const reactFlowWrapper = useRef<any>();
    const [reactFlowInstance, setReactFlowInstance] = useState<any>();

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top
            });

            const uid = uuid();
            const tableName = 'new_table';
            const tableId = uid;

            const newTable = {
                id: uid,
                type: ECustomNodeTypes.TableNode,
                position,
                data: {
                    tableName,
                    tableId
                }
            };

            const sampleNode = {
                id: uuid(),
                draggable: false,
                position: { x: 0, y: 50 },
                data: {
                    tableName,
                    tableId,
                    columnName: 'new_column',
                    dataType: 'varchar',
                    constraints: {
                        defaultValue: ''
                    }
                },
                type: ECustomNodeTypes.ColumnNode,
                parentNode: uid,
                extent: 'parent',
                expandParent: true
            };

            setNodes((nds) => nds.concat([newTable, sampleNode]));
        },
        [reactFlowInstance]
    );

    return (
        <ReactFlowComponent
            onConnect={onConnect}
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            edges={edges}
            onDrop={onDrop}
            onDragOver={onDragOver}
            setReactFlowInstance={setReactFlowInstance}
            reactFlowWrapper={reactFlowWrapper}
        />
    );
}
