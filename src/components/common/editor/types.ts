export interface IEditorContainerProps {
    value: string;
    setValue: any;
    mode?: string;
}

export interface IEditorComponentProps extends IEditorContainerProps {
    theme: string;
}
