import IconButtonComponent from './component';
import { IIconButtonContainerProps } from './types';

const IconButtonContainer = (props: IIconButtonContainerProps) => {
    return <IconButtonComponent {...props} />;
};

export default IconButtonContainer;
