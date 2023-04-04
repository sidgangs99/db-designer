import { customColors } from '../../../colors';
import { ILoaderComponentProps } from './types';

export default function LoaderComponent(props: ILoaderComponentProps) {
    const {
        Component,
        color = customColors.grey.light,
        speedMultiplier,
        size
    } = props;
    return (
        <div className="flex h-full w-full items-center justify-center bg-grey-darker">
            <Component
                color={color}
                speedMultiplier={speedMultiplier}
                size={size}
            />
        </div>
    );
}
