import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

import { IEditorComponentProps } from './types';

const EditorComponent = (props: IEditorComponentProps) => {
    const { value, setValue, theme, mode = 'sql' } = props;

    return (
        <div className={'w-full rounded-lg border border-grey-main p-1'}>
            <AceEditor
                mode={mode}
                theme="monokai"
                onChange={(data) => {
                    setValue(data);
                }}
                name="UNIQUE_ID_OF_DIV"
                showPrintMargin={false}
                editorProps={{ $blockScrolling: true }}
                value={value}
                width={'100%'}
                height={'40vh'}
            />
        </div>
    );
};

export default EditorComponent;
