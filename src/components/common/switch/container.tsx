import SwitchComponent from './component';

import { ISwitchContainerProps } from './types';

export default function SwitchContainer(props: ISwitchContainerProps) {
    return <SwitchComponent {...props} />;
}
