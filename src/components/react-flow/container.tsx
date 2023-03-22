import { useCallback, useEffect } from 'react';
import {
    MarkerType,
    useEdgesState,
    useNodesState,
    useReactFlow,
    XYPosition
} from 'reactflow';

import { useEdgesStore } from '../../store/edges/state';
import { useNodesStore } from '../../store/nodes/state';
import { INode, ITableData } from '../../store/nodes/types';
import { uuid } from '../../util/helper';
import ReactFlowComponent from './component';
import { isValidEdge } from './helper-functions';
import { ECustomEdgeTypes, ECustomNodeTypes } from './types';

export default function ReactFlowContainer() {
    const { nodes: nodesState } = useNodesStore((state: any) => state);
    const { edges: edgesState, addEdge } = useEdgesStore((state: any) => state);

    const [nodes, setNodes, onNodesChange] = useNodesState(nodesState);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState);

    const { getNodes } = useReactFlow();

    useEffect(() => {
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
                    }

                    return _node;
                })
            );
        };

        const onDelete = (id: string) => {
            const allNodes = getNodes();
            const deletedNode = allNodes.filter((_node) => _node.id === id)[0];
            setNodes((_nodes) => _nodes.filter((_node) => _node.id !== id));
            updatePosition(deletedNode);
        };

        const updatePosition = (deletedNode: any) => {
            setNodes((_nodes) =>
                _nodes.map((_node) => {
                    if (
                        deletedNode.data.tableName === _node.data.tableName &&
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

        const addNewNode = (data: ITableData) => {
            setNodes((_nodes: any[]) => {
                let positionAddNode: XYPosition = { x: 0, y: 0 };
                _nodes.forEach((_node) => {
                    if (
                        _node.data.tableName === data.tableName &&
                        _node.type === ECustomNodeTypes.AddColumnNode
                    ) {
                        positionAddNode = _node.position;
                    }
                });

                const newNode = {
                    id: uuid(),
                    draggable: false,
                    position: positionAddNode,
                    data: {
                        ...data,
                        columnName: 'New Column',
                        dataType: 'varchar',
                        tableName: data.tableName
                    },
                    parentNode: data.tableName,
                    extent: 'parent',
                    type: ECustomNodeTypes.ColumnNode,
                    expandParent: true
                };

                _nodes.push(newNode);

                return _nodes.map((_node) => {
                    if (
                        data.tableName === _node.data.tableName &&
                        _node.type === ECustomNodeTypes.AddColumnNode
                    ) {
                        return {
                            ..._node,
                            position: {
                                x: _node.position.x,
                                y: positionAddNode.y + 50
                            }
                        };
                    }
                    return _node;
                });
            });
        };

        nodesState.forEach((node: INode) => {
            node.data.onUpdateNode = onUpdateNode;
            node.data.onDelete = onDelete;
            node.data.addNewNode = addNewNode;
        });

        // setNodes(nodesState);
    }, []);

    useEffect(() => {
        // setNodes(nodesState);
    }, [nodesState]);

    const onConnect = useCallback((params: any) => {
        const { source, target } = params;
        const newEdge = {
            id: `${source}.${target}`,
            source: source,
            target: target,
            animated: true,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 15,
                height: 15,
                color: '#fb7185'
            },
            style: {
                strokeWidth: 1.5,
                stroke: '#fb7185'
            },
            type: ECustomEdgeTypes.ReferenceKey
        };

        if (isValidEdge(source, target)) {
            addEdge(newEdge);
        } else {
            console.error(
                'Adding Primary key to same table is not possible, please brush up your basics ;)'
            );
        }
    }, []);

    useEffect(() => {
        setEdges(edgesState);
    }, [edgesState]);

    return (
        <ReactFlowComponent
            onConnect={onConnect}
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            edges={edges}
        />
    );
}
