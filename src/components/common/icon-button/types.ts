export interface IIconButtonContainerProps {
    label: string;
    type?: any;
    form?: string;
    key?: string;
    onClick?: any;
    disabled?: boolean;
    Icon: any;
    onDragStart?: any;
    draggable?: any;
    className?: string;
}

export interface IIconButtonComponentProps extends IIconButtonContainerProps {}
