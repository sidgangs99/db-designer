import HomeContainer from '../home/container';
import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    return (
        <div className="h-full w-full">
            <HomeContainer />
        </div>
    );
}
