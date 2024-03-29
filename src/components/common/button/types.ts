export interface IButtonContainerProps {
    label: string;
    type?: any;
    form?: string;
    key?: string;
    onClick?: any;
    disabled?: boolean;
    size?: string;
    className?: string;
    as?: string;
    primary?: boolean;
    secondary?: boolean;
}

export interface IButtonComponentProps extends IButtonContainerProps {}
