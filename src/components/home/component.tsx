import ReactFlowContainer from '../react-flow/container';
import SidebarContainer from '../sidebar/container';

import { IHomeComponentProps } from './types';

export default function HomeComponent(props: IHomeComponentProps) {
    return (
        <div className="h-full w-full flex-col">
            <div className="flex h-5/100 w-full bg-chelsea-cucumber-200">
                <SidebarContainer />
            </div>
            <div className="flex h-90/100 w-full ">
                <ReactFlowContainer />
            </div>
            <a
                className="flex h-4/100 w-full items-center justify-center bg-chelsea-cucumber-100"
                target="_blank"
                rel="noopener noreferrer"
                href={'https://sidgangs99.github.io/resume/'}
            >
                <p className="text-sm text-chelsea-cucumber-800">
                    Made with ❤️ by Siddharth Gangwar 🚀
                </p>
            </a>
        </div>
    );
}
