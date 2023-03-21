export interface IModalContainerProps {
    open: boolean;
    setOpen: Function;
    Header: any;
    Body: any;
    Buttons: any[];
}

export interface IModalComponentProps extends IModalContainerProps {
    onClose: any;
}
