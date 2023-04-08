import useAuthStore from '../../../store/firebase/state';
import MenuComponent from './component';
import { IMenuContainerProps } from './types';

const MenuContainer = (props: IMenuContainerProps) => {
    const { user }: any = useAuthStore();

    return <MenuComponent {...props} user={user} />;
};

export default MenuContainer;
