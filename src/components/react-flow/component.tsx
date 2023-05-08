import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';

import 'reactflow/dist/style.css';
import { customColors } from '../../colors';
import { useLayoutStore } from '../../store/layout/store';
import useWorkbookStore from '../../store/workbook/state';
import RightHeaderContainer from '../right-sidebar/container';
import { customEdgeTypes, nodeTypes } from './constant';
import './controls.styles.css';
import { IReactFlowComponentProps } from './types';

export default function ReactFlowComponent(props: IReactFlowComponentProps) {
    const { reactFlowWrapper, setReactFlowInstance, onDrop, onDragOver } =
        props;
    const { nodes, edges, onEdgesChange, onNodesChange, onConnect } =
        useWorkbookStore();

    const { openRightSideBar } = useLayoutStore();

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
                    defaultEdgeOptions={{ zIndex: 2000 }}
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
