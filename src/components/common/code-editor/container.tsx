import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

import Component from './component';
import { ICodeEditorContainerProps } from './types';

export default function CodeEditorContainer(props: ICodeEditorContainerProps) {
    const options: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
        wordWrap: 'on',
        minimap: {
            enabled: false
        },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 12,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabCompletion: 'on'
    };

    return <Component options={options} />;
}
