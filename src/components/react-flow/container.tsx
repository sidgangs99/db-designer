import { useCallback, useEffect } from 'react';
import { MarkerType, useEdgesState, useNodesState } from 'reactflow';

import { useEdges } from '../../store/edges/state';
import { useTables } from '../../store/nodes/state';
import ReactFlowComponent from './component';
import { isValidEdge } from './helperFunctions';
import { ECustomEdgeTypes } from './types';

export default function ReactFlowContainer() {
    const nodesState = useTables((state: any) => state);
    const edgesState = useEdges((state: any) => state);

    const [nodes, setNodes, onNodesChange] = useNodesState(nodesState.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState.edges);

    useEffect(() => {
        setEdges(edgesState.edges);
    }, [edgesState.edges]);

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
            zIndex: 10,
            type: ECustomEdgeTypes.ReferenceKey
        };

        if (isValidEdge(source, target)) {
            edgesState.addEdge(newEdge);
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
