import { ILoaderComponentProps } from './types';

export default function LoaderComponent(props: ILoaderComponentProps) {
    const { Component, color, speedMultiplier, size } = props;
    return (
        <div className="flex h-full w-full items-center justify-center bg-chelsea-cucumber-50">
            <Component
                color={color}
                speedMultiplier={speedMultiplier}
                size={size}
            />
        </div>
    );
}
