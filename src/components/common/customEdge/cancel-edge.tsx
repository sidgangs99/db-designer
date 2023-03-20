import { RxCross2 } from 'react-icons/rx';
import { getBezierPath } from 'reactflow';

import { useEdges } from '../../../store/edges/state';

const foreignObjectSize = 40;

export default function CustomCancelEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd
}: any) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    const state: any = useEdges();

    const onEdgeClick = (evt: any, id: any) => {
        evt.stopPropagation();
        state.removeEdge(id);
    };

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 3}
                y={labelY - foreignObjectSize / 3}
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <div>
                    <button
                        onClick={(event) => onEdgeClick(event, id)}
                        className={
                            'rounded-full bg-corduroy-100 p-1.5 text-xs shadow-2xl'
                        }
                    >
                        <RxCross2 />
                    </button>
                </div>
            </foreignObject>
        </>
    );
}
