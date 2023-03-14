import { useEffect, useRef } from 'react';
import Split from 'split.js';
import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    function C1() {
        return (
            <div className="border border-red-400">
                Component 1 {Date.now()}
            </div>
        );
    }
    function C2() {
        return (
            <div className="border border-black">Component 2 {Date.now()}</div>
        );
    }

    const splitContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (splitContainer.current) {
            Split(['#left-pane', '#right-pane'], {
                sizes: [80, 200],
                minSize: 400,
                gutterSize: 5,
                direction: 'horizontal'
            });
        }
    }, []);

    return (
        <div
            className="flex w-full border border-green-400"
            ref={splitContainer}
        >
            <div id="left-pane">
                <C1 />
            </div>
            <div id="right-pane">
                <C2 />
            </div>
        </div>
    );
}

// return (
//     <Split
//         className="split-container"
//         sizes={[50, 50]}
//         minSize={100}
//         gutterSize={10}
//         direction="horizontal"
//         // onDragEnd={handleResize}
//     >
//         <C1 />
//         <C2 />
//     </Split>
// );
// }
