export interface IDropdownOptions {
    label: string;
    value: string;
}

export interface ISingleSelectDropdownContainerProps {
    values: IDropdownOptions[];
    setValue: any;
    value: string;
    className?: string;
    Icon: any;
}

export interface ISingleSelectDropdownComponentProps
    extends ISingleSelectDropdownContainerProps {}
