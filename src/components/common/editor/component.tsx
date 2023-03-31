import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';

import { IEditorComponentProps } from './types';

const EditorComponent = (props: IEditorComponentProps) => {
    const { value, setValue } = props;

    return (
        <AceEditor
            mode="sql"
            theme="monokai"
            onChange={(data) => {
                setValue(data);
            }}
            name="UNIQUE_ID_OF_DIV"
            showPrintMargin={false}
            editorProps={{ $blockScrolling: true }}
            value={value}
            width={'100%'}
            height={'80vh'}
        />
    );
};

export default EditorComponent;
