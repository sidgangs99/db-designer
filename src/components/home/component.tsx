import { ReactFlowProvider } from 'reactflow';
import ReactFlowContainer from '../react-flow/container';

import { IHomeComponentProps } from './types';

export default function HomeComponent(props: IHomeComponentProps) {
    return (
        <ReactFlowProvider>
            <ReactFlowContainer />
        </ReactFlowProvider>
    );
}
