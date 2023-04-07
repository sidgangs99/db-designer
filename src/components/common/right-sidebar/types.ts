export interface IRightSidebarContainerProps {}

export interface IRightSidebarComponentProps extends IRightSidebarContainerProps {
    node: any;
    control: any;
    watch: any;
    constraintsLogic: any;
    setValue: any;
    errors: any;
    defaultValueInputType: string;
    getValues: any;
    handleSubmit: any;
    onSubmit: any;
    register: any;
    newDataType: string;
    onClose: any;
    onColumnClick?: any;
}

export interface IRightSidebarTableProps extends IRightSidebarContainerProps {
    node: any;
    columns: any[];
    handleSubmit: any;
    onSubmit: any;
    register: any;
    onClose: any;
    errors: any;
    onColumnClick: any;
}