import ButtonComponent from './component';
import { IButtonContainerProps } from './types';

const ButtonContainer = (props: IButtonContainerProps) => {
    return <ButtonComponent {...props} />;
};

export default ButtonContainer;
