export interface ISidebarContainerProps {}

export interface ISidebarComponentProps extends ISidebarContainerProps {
    onDragStart: any;
    avatarMenuOptions: any;
    theme: string;
    updateTheme: any;
    openResetViewModal: boolean;
    openDownloadSqlFileModal: boolean;
    setOpenResetViewModal: any;
    fetchSaveWorkbook: any;
    exportDropdownOption: any;
    setOpenDownloadSqlFileModal: any;
}
