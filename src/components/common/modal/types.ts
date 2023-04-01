export interface IModalContainerProps {
    open: boolean;
    setOpen: Function;
    Header?: any;
    Body: any;
    Footer?: any;
    className?: string;
}

export interface IModalComponentProps extends IModalContainerProps {
    onClose: any;
}
