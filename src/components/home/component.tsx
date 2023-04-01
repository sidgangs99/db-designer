import ReactFlowContainer from '../react-flow/container';
import SidebarContainer from '../sidebar/container';

import { IHomeComponentProps } from './types';

export default function HomeComponent(props: IHomeComponentProps) {
    return (
        <div className="h-full w-full flex-col">
            <div className="flex h-5/100 w-full border-b bg-oatmeal-light dark:border-neutral-600 dark:bg-neutral-900">
                <SidebarContainer />
            </div>
            <div className="flex h-92/100 w-full bg-white dark:bg-black">
                <ReactFlowContainer />
            </div>
            <div className="flex h-3/100 w-full items-center justify-center bg-oatmeal-main dark:bg-neutral-900">
                <a
                    className="px-24"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={'https://sidgangs99.github.io/resume/'}
                >
                    <p className="text-sm text-slate-main dark:text-coral-main">
                        Made with ❤️ by Siddharth Gangwar 🚀
                    </p>
                </a>
            </div>
        </div>
    );
}
