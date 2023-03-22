export interface IModalContainerProps {
    open: boolean;
    setOpen: Function;
    Header: any;
    Body: any;
    Footer: any;
}

export interface IModalComponentProps extends IModalContainerProps {
    onClose: any;
}
