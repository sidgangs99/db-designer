import { useThemeStore } from '../../../store/darkMode/state';
import EditorComponent from './component';
import { IEditorContainerProps } from './types';

const EditorContainer = (props: IEditorContainerProps) => {
    const { value } = props;

    const { theme }: any = useThemeStore();

    return <EditorComponent theme={theme} {...props} />;
};

export default EditorContainer;
