import { useCallback, useEffect, useRef, useState } from 'react';
import { useEdgesState, useNodesState, XYPosition } from 'reactflow';
import { Set } from 'typescript';

import { useEdgesStore } from '../../store/edges/state';
import { useNodesStore } from '../../store/nodes/state';
import { INode, INodeDetails } from '../../store/nodes/types';
import { uuid } from '../../util/helper';
import ReactFlowComponent from './component';
import { newEdge } from './constants';
import { isValidEdge } from './helper-functions';
import { ECustomNodeTypes } from './types';

export default function ReactFlowContainer() {
    const { nodes: nodesState } = useNodesStore((state: any) => state);
    const { edges: edgesState } = useEdgesStore((state: any) => state);

    const [nodes, setNodes, onNodesChange] = useNodesState(nodesState);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState);

    const addEdge = (newEdge: any) => {
        setEdges((_edges: any) => [..._edges, newEdge]);
    };

    const onUpdateNode = (data: any, id: string) => {
        setNodes((_nodes) =>
            _nodes.map((_node) => {
                if (_node.id === id) {
                    return {
                        ..._node,
                        data: {
                            ..._node.data,
                            ...data
                        }
                    };
                } else if (
                    _node.data.tableId === data.tableId &&
                    _node.data.tableName !== data.tableName
                ) {
                    return {
                        ..._node,
                        data: {
                            ..._node.data,
                            tableName: data.tableName
                        }
                    };
                }

                return _node;
            })
        );
    };

    const onDeleteNode = (id: string) => {
        const deletedNodes = new Set<string>();
        let deletedNode = {};
        setNodes((_nodes) =>
            _nodes.filter((_node) => {
                if (_node.id === id) {
                    deletedNodes.add(_node.id);
                    deletedNode = _node;
                }
                return _node.id !== id;
            })
        );

        deleteEdgeFromNodes(deletedNodes);
        updatePosition(deletedNode);
    };

    const deleteEdgeFromNodes = (deletedNode: Set<string>) => {
        setEdges((_edges) => {
            return _edges.filter(
                (_edge) =>
                    !deletedNode.has(_edge.source) &&
                    !deletedNode.has(_edge.target)
            );
        });
    };

    const deleteEdgeFromEdgeId = (id: any) => {
        setEdges((_edges) => {
            return _edges.filter((_edge) => {
                return _edge.id !== id;
            });
        });
    };

    const onDeleteTable = (id: string) => {
        const deletedNodes = new Set<string>();

        setNodes((_nodes) =>
            _nodes.filter((_node) => {
                if (_node.data.tableId === id) deletedNodes.add(_node.id);
                return _node.data.tableId !== id;
            })
        );
        deleteEdgeFromNodes(deletedNodes);
    };

    const updatePosition = (deletedNode: any) => {
        setNodes((_nodes) =>
            _nodes.map((_node) => {
                if (
                    deletedNode.data.tableId === _node.data.tableId &&
                    _node.type !== ECustomNodeTypes.TableNode &&
                    deletedNode.position.y < _node.position.y
                ) {
                    return {
                        ..._node,
                        position: {
                            x: _node.position.x,
                            y: _node.position.y - 50
                        }
                    };
                }
                return _node;
            })
        );
    };

    const addNewNode = (data: INodeDetails, id: string) => {
        setNodes((_nodes: any[]) => {
            let newNodePosition: XYPosition = { x: 0, y: 0 };
            _nodes.forEach((_node) => {
                if (
                    _node.data.tableId === data.tableId &&
                    _node.data?.columnName
                ) {
                    console.log(_node.position.y, newNodePosition.y);
                    newNodePosition = {
                        x: 0,
                        y: Math.max(
                            _node.position.y + 50,
                            newNodePosition.y + 50
                        )
                    };
                }
            });

            const newNode = {
                id: uuid(),
                draggable: false,
                position: newNodePosition,
                data: {
                    ...data,
                    columnName: 'new_column',
                    dataType: 'varchar',
                    constraints: {
                        defaultValue: '',
                        ...data.constraints
                    }
                },
                parentNode: id,
                extent: 'parent',
                type: ECustomNodeTypes.ColumnNode,
                expandParent: true
            };

            return [..._nodes, newNode];
        });
    };

    const onReset = () => {
        setNodes(() => []);
        setEdges(() => []);
    };

    useEffect(() => {
        setNodes((_nodes: any) => {
            return _nodes.map((_node: INode) => ({
                ..._node,
                data: {
                    ..._node.data,
                    onUpdateNode,
                    onDeleteNode,
                    addNewNode,
                    deleteEdgeFromEdgeId,
                    onDeleteTable,
                    onReset
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
                data: { tableName, tableId }
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
                    },
                    onUpdateNode,
                    onDeleteNode,
                    addNewNode,
                    deleteEdgeFromEdgeId,
                    onDeleteTable,
                    onReset
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
