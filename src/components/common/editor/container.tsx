import { useEffect, useState } from 'react';
import EditorComponent from './component';
import { IEditorContainerProps } from './types';

const EditorContainer = (props: IEditorContainerProps) => {
    const { value } = props;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (value.length) setIsLoading(false);
    }, [value]);

    return isLoading ? <>Loading...</> : <EditorComponent {...props} />;
};

export default EditorContainer;
