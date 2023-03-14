import { javascript } from '@codemirror/lang-javascript';
import ReactCodeMirror from '@uiw/react-codemirror';
import { useCallback } from 'react';
import { ICodeEditorComponentProps } from './types';

export default function CodeEditorComponent(props: ICodeEditorComponentProps) {
    const onChange = useCallback((value: any, viewUpdate: any) => {
        console.log('value:', value, viewUpdate);
    }, []);

    return (
        <div className="h-full">
            <ReactCodeMirror
                value="console.log('hello world!');"
                height="100vh"
                extensions={[javascript({ jsx: true })]}
                onChange={onChange}
            />
        </div>
    );
}
