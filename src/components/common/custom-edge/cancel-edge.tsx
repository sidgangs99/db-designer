import { RxCross2 } from 'react-icons/rx';

import { getBezierPath, useReactFlow, useStore } from 'reactflow';

import { useCallback } from 'react';
import './glow-edge.css';
import { getEdgeParams } from './helper';

const foreignObjectSize = 28;

export default function CustomCancelEdge(props: any) {
    const { id, source, target, style = {}, markerEnd, markerStart } = props;

    const { setEdges } = useReactFlow();

    const sourceNode = useStore(
        useCallback((store) => store.nodeInternals.get(source), [source])
    );
    const targetNode = useStore(
        useCallback((store) => store.nodeInternals.get(target), [target])
    );

    if (!sourceNode || !targetNode) {
        return null;
    }

    const {
        sx: sourceX,
        sy: sourceY,
        tx: targetX,
        ty: targetY,
        sourcePos: sourcePosition,
        targetPos: targetPosition
    } = getEdgeParams(sourceNode, targetNode);

    const onDeleteButtonClick = (evt: any, id: any) => {
        setEdges((_edges) => {
            return _edges.filter((_edge) => {
                return _edge.id !== id;
            });
        });
    };

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path stroke-grey-lighter"
                d={edgePath}
                markerEnd={markerEnd}
                markerStart={markerStart}
                strokeWidth={2}
                type="floating"
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                requiredExtensions="http://www.w3.org/1999/xhtml"
                className="react-flow__edge-path-cancel-button"
            >
                <div>
                    <button
                        onClick={(event) => onDeleteButtonClick(event, id)}
                        className={
                            'rounded-full border border-grey-main bg-grey-dark p-1 text-lg hover:border-coral-main'
                        }
                    >
                        <RxCross2 />
                    </button>
                </div>
            </foreignObject>
        </>
    );
}
