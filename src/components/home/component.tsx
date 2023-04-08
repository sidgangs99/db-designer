import HeaderContainer from '../header/container';
import ReactFlowContainer from '../react-flow/container';

import { IHomeComponentProps } from './types';

export default function HomeComponent(props: IHomeComponentProps) {
    return (
        <div className="h-full w-full flex-col">
            <div className="flex h-5/100 w-full border-b border-neutral-600 bg-neutral-900">
                <HeaderContainer />
            </div>
            <div className="flex h-92/100 w-full bg-grey-darker">
                <ReactFlowContainer />
            </div>
            {/* <div className=""> */}
            <a
                className="flex h-3/100 w-full items-center justify-center bg-neutral-900"
                target="_blank"
                rel="noopener noreferrer"
                href={'https://sidgangs99.github.io/resume/'}
            >
                <p className="text-sm font-light tracking-wider text-coral-main">
                    Made with ❤️ by Siddharth Gangwar 🚀
                </p>
            </a>
            {/* </div> */}
        </div>
    );
}
