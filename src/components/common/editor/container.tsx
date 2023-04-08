import { useEffect, useState } from 'react';
import { useThemeStore } from '../../../store/darkMode/state';
import EditorComponent from './component';
import { IEditorContainerProps } from './types';

const EditorContainer = (props: IEditorContainerProps) => {
    const { value } = props;

    const { theme }: any = useThemeStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (value.length) setIsLoading(false);
    }, [value]);

    return isLoading ? (
        <>Loading...</>
    ) : (
        <EditorComponent theme={theme} {...props} />
    );
};

export default EditorContainer;
