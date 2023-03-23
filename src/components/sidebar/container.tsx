import SidebarComponent from './component';
import { ISidebarContainerProps } from './types';

export default function SidebarContainer(props: ISidebarContainerProps) {
    const onDragStart = (event: any, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return <SidebarComponent onDragStart={onDragStart} />;
}
