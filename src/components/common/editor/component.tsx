import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

import { darkTheme } from '../../../store/darkMode/constants';
import { IEditorComponentProps } from './types';

const EditorComponent = (props: IEditorComponentProps) => {
    const { value, setValue, theme } = props;

    return (
        <div className={'w-full rounded-lg border p-1'}>
            <AceEditor
                mode="sql"
                theme={theme === darkTheme ? 'monokai' : 'github'}
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
