import { RxCross2 } from 'react-icons/rx';
import { getBezierPath, useReactFlow } from 'reactflow';

import './glow-edge.css';

const foreignObjectSize = 26;
export default function CustomCancelEdge(props: any) {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd,
        markerStart
    } = props;

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    });

    const { setEdges } = useReactFlow();

    const onDeleteButtonClick = (evt: any, id: any) => {
        setEdges((_edges) => {
            return _edges.filter((_edge) => {
                return _edge.id !== id;
            });
        });
    };

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
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={labelX - foreignObjectSize / 2}
                y={labelY - foreignObjectSize / 2}
                requiredExtensions="http://www.w3.org/1999/xhtml"
                className="react-flow__edge-path "
            >
                <div>
                    <button
                        onClick={(event) => onDeleteButtonClick(event, id)}
                        className={'rounded-full bg-grey-dark p-1 text-lg'}
                    >
                        <RxCross2 />
                    </button>
                </div>
            </foreignObject>
        </>
    );
}
