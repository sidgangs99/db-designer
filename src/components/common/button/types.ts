export interface IButtonContainerProps {
    label: string;
    type?: any;
    form?: string;
    key?: string;
    onClick?: any;
    disabled?: boolean;
}

export interface IButtonComponentProps extends IButtonContainerProps {}
