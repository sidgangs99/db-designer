import { useCallback, useEffect } from 'react';
import { MarkerType, useEdgesState, useNodesState } from 'reactflow';

import { useEdges } from '../../store/edges/state';
import { useNodes } from '../../store/nodes/state';
import { INode } from '../../store/nodes/types';
import ReactFlowComponent from './component';
import { isValidEdge } from './helperFunctions';

export default function ReactFlowContainer() {
    const { nodes: nodesState } = useNodes((state: any) => state);
    const { edges: edgesState, addEdge } = useEdges((state: any) => state);

    const [nodes, setNodes, onNodesChange] = useNodesState(nodesState);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState);

    useEffect(() => {
        const updateNode = (data: any, id: string) => {
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

        nodesState.forEach((node: INode) => {
            node.data.updateNode = updateNode;
        });

        setNodes(nodesState);
    }, []);

    // useEffect(() => {
    //     setNodes(nodesState);
    // }, [nodesState]);

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
            }
        };

        if (isValidEdge(source, target)) {
            addEdge(newEdge);
        } else {
            console.error(
                'Adding Primary key to same table is not possible, please brush up your basics ;)'
            );
        }
    }, []);

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
