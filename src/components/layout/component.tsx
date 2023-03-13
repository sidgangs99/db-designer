import Split from 'react-split';

import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    function C1() {
        return <div className="">Component 1 {Date.now()}</div>;
    }
    function C2() {
        return <div className="">Component 2 {Date.now()}</div>;
    }
    return (
        <main className="h-full w-full border border-black">
            <Split
                className="flex"
                sizes={[30, 70]}
                minSize={300}
                expandToMin={false}
                gutterSize={10}
                gutterAlign="center"
                snapOffset={30}
                dragInterval={6}
                direction="horizontal"
                cursor="col-resize"
            >
                <C1 />
                <C2 />
            </Split>
        </main>
    );
}
