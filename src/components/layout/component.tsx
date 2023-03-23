import HomeContainer from '../home/container';
import SidebarContainer from '../sidebar/container';
import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    return (
        <div className="h-full w-full flex-col">
            <div className="flex h-1/20 w-full bg-chelsea-cucumber-200">
                <SidebarContainer />
            </div>
            <div className="flex h-19/20 w-full ">
                <HomeContainer />
            </div>
        </div>
    );
}
