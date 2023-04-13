import { useCallback, useRef, useState } from 'react';

import useWorkbookStore from '../../store/workbook/state';
import { useSaveWorkbook } from '../hooks/useSaveWorkbook';
import ReactFlowComponent from './component';

export default function ReactFlowContainer() {
    useSaveWorkbook();
    const { dropNewTable } = useWorkbookStore();
    const reactFlowWrapper = useRef<any>();
    const [reactFlowInstance, setReactFlowInstance] = useState<any>();

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top
            });

            dropNewTable(position);
        },
        [reactFlowInstance]
    );

    return (
        <ReactFlowComponent
            onDrop={onDrop}
            onDragOver={onDragOver}
            setReactFlowInstance={setReactFlowInstance}
            reactFlowWrapper={reactFlowWrapper}
        />
    );
}
