export interface IDropdownOptions {
    label: string;
    value: string;
    id?: string;
}

export interface ISingleSelectDropdownContainerProps {
    values: IDropdownOptions[];
    setValue: any;
    value: Record<string, any>;
    className?: string;
    Icon?: any;
    optionsClassName?: string;
}

export interface ISingleSelectDropdownComponentProps
    extends ISingleSelectDropdownContainerProps {}
