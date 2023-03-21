import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    ReactFlowProvider
} from 'reactflow';

import 'reactflow/dist/style.css';
import { nodeTypes } from './constants';
import { customEdgeTypes, IReactFlowComponentProps } from './types';

export default function ReactFlowComponent(props: IReactFlowComponentProps) {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = props;

    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
                edgeTypes={customEdgeTypes}
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </ReactFlowProvider>
    );
}
