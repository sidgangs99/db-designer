import { useEffect, useRef } from 'react';
import Split from 'split.js';
import CodeEditorContainer from '../common/code-editor/container';
import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
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
        <div className="flex w-full" ref={splitContainer}>
            <div id="left-pane">
                <CodeEditorContainer />
            </div>
            <div id="right-pane">
                <C2 />
            </div>
        </div>
    );
}
