import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';

import 'reactflow/dist/style.css';
import { customColors } from '../../colors';
import { useLayoutStore } from '../../store/layout/store';
import RightHeaderContainer from '../right-sidebar/container';
import { nodeTypes } from './constants';
import { customEdgeTypes, IReactFlowComponentProps } from './types';

import { useStore } from 'zustand';
import './controls.styles.css';

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

    const { openRightSideBar } = useStore(useLayoutStore);

    return (
        <div className="flex h-full w-full flex-grow" ref={reactFlowWrapper}>
            <div className="md:7/12 h-full flex-grow xl:w-9/12 2xl:w-11/12">
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
                    <MiniMap
                        nodeColor={customColors.grey.main}
                        maskColor={customColors.grey.dark + '73'}
                        style={{ backgroundColor: customColors.grey.darker }}
                    />
                    <Controls
                        className="rounded-sm border border-grey-light bg-grey-darker fill-grey-lighter hover:bg-transparent"
                        showFitView
                    />
                    <Background gap={1000} />
                </ReactFlow>
            </div>
            {openRightSideBar && (
                <div
                    className={`ml-1 h-full w-full overflow-y-auto border-l-4 border-grey-main px-2 md:w-5/12 xl:w-4/12 2xl:w-3/12`}
                >
                    <RightHeaderContainer />
                </div>
            )}
        </div>
    );
}
