import ReactFlow, { Controls, MiniMap } from 'reactflow';

import 'reactflow/dist/style.css';
import { IReactFlowComponentProps } from './types';

export default function ReactFlowComponent(props: IReactFlowComponentProps) {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = props;
    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <MiniMap />
                <Controls />
            </ReactFlow>
        </>
    );
}
