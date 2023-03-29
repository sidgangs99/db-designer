export interface ISwitchContainerProps {
    enabled: boolean;
    onChange: any;
    label: string;
    isDisabled?: boolean;
    disabledTooltipMessage?: string;
}

export interface ISwitchComponentProps extends ISwitchContainerProps {}
