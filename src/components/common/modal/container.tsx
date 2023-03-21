import ModalComponent from './component';
import { IModalContainerProps } from './types';

export default function ModalContainer(props: IModalContainerProps) {
    const { setOpen, open } = props;

    const onClose = () => setOpen(!open);

    return <ModalComponent onClose={onClose} {...props} />;
}
