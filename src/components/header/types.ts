export interface IHeaderContainerProps {}

export interface IHeaderComponentProps extends IHeaderContainerProps {
    onDragStart: any;
    avatarMenuOptions: any;
    theme: string;
    updateTheme: any;
    openResetViewModal: boolean;
    openDownloadSqlFileModal: boolean;
    setOpenResetViewModal: any;
    exportDropdownOption: any;
    setOpenDownloadSqlFileModal: any;
}
