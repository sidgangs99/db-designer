import { useCallback } from 'react';
import { addEdge, useEdgesState, useNodesState } from 'reactflow';

import ReactFlowComponent from './component';

export default function ReactFlowContainer() {
    const initialNodes = [
        { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
        { id: '2', position: { x: 1000, y: 100 }, data: { label: '2' } }
    ];

    const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
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
