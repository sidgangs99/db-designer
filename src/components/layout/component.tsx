import HomeContainer from '../home/container';
import SidebarContainer from '../sidebar/container';
import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    return (
        <div className="h-full w-full flex-col">
            <div className="flex h-5/100 w-full bg-chelsea-cucumber-200">
                <SidebarContainer />
            </div>
            <div className="flex h-90/100 w-full ">
                <HomeContainer />
            </div>
            <a className="flex justify-center items-center h-4/100 w-full bg-chelsea-cucumber-100" href={"https://sidgangs99.github.io/resume/"}>
                <p className='text-chelsea-cucumber-800 text-sm'>Made with ❤️ by Siddharth Gangwar 🚀</p>
            </a>
        </div>
    );
}
