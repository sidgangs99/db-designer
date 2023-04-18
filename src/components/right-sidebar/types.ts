export interface IRightHeaderContainerProps {}

export interface IRightHeaderComponentProps extends IRightHeaderContainerProps {
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
    newDataType: Record<string, any>;
    onClose: any;
    onColumnClick?: any;
    newDefaultValueOption?: any;
}

export interface IRightSidebarTableProps extends IRightHeaderContainerProps {
    node: any;
    columns: any[];
    handleSubmit: any;
    onSubmit: any;
    register: any;
    onClose: any;
    errors: any;
    onColumnClick: any;
}
