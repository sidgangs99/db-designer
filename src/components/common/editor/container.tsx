import EditorComponent from './component';
import { IEditorContainerProps } from './types';

const EditorContainer = (props: IEditorContainerProps) => {
    const { value } = props;

    return value?.length ? <EditorComponent {...props} /> : <>Loading...</>;
};

export default EditorContainer;
