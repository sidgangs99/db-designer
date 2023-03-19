import { useCallback } from 'react';
import { addEdge, useEdgesState, useNodesState } from 'reactflow';

import ReactFlowComponent from './component';
import { initialEdges, initialNodes } from './constants';

export default function ReactFlowContainer() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

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
