import { Position } from 'reactflow';

export interface ICustomNodeContainerProps {
    data: any;
    isConnectable: boolean;
    sourcePosition: Position;
    targetPosition: Position;
}

export interface ICustomNodeComponentProps extends ICustomNodeContainerProps {}
