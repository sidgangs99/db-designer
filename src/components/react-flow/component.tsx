import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';

import 'reactflow/dist/style.css';
import RightSidebarContainer from '../common/right-sidebar/container';
import { nodeTypes } from './constants';
import { customEdgeTypes, IReactFlowComponentProps } from './types';

export default function ReactFlowComponent(props: IReactFlowComponentProps) {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        reactFlowWrapper,
        setReactFlowInstance,
        onDrop,
        onDragOver
    } = props;

    return (
        <div className="flex h-full w-full flex-grow">
            <div className="h-full w-10/12 flex-grow" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    nodeTypes={nodeTypes}
                    edgeTypes={customEdgeTypes}
                    proOptions={{ hideAttribution: true }}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={setReactFlowInstance}
                >
                    <MiniMap />
                    <Controls />
                    <Background gap={1000} />
                </ReactFlow>
            </div>
            <RightSidebarContainer />
        </div>
    );
}
