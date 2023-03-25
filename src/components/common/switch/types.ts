export interface ISwitchContainerProps {
    enabled: boolean;
    onChange: any;
    label: string;
    isDisabled?: boolean;
}

export interface ISwitchComponentProps extends ISwitchContainerProps {}
