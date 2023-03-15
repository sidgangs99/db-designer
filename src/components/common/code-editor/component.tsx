import MonacoEditor from '@monaco-editor/react';

import useValueOnChange from './hooks/useOnChange';
import { ICodeEditorComponentProps } from './types';

export default function CodeEditorComponent(props: ICodeEditorComponentProps) {
    const { value, setOnChangeValue } = useValueOnChange();
    const { options } = props;

    return (
        <div className="h-full">
            <MonacoEditor
                height="100vh"
                language="sql"
                defaultValue={value}
                theme="vs-dark"
                options={options}
                className=" overflow-hidden"
                onChange={setOnChangeValue}
            />
        </div>
    );
}
