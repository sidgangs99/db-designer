import { useState } from 'react';
import useAuthStore from '../../../store/firebase/state';
import ModalContainer from '../../common/modal/container';

interface IProfileViewModal {
    open: boolean;
    setOpen: any;
}

export default function ProfileViewModal(props: IProfileViewModal) {
    const { open, setOpen } = props;
    const [deleteEnabled, setDeleteEnabled] = useState(false);

    const { user } = useAuthStore();

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            Header={
                <div className="mx-8 my-6 flex whitespace-nowrap text-4xl">
                    Hi{' '}
                    <p className="pl-4 text-coral-main">{user?.displayName}</p>,
                </div>
            }
            Body={
                <div className="mx-8 mb-10 flex space-x-2">
                    <p className="text-xl">
                        We are putting in a lot of effort to create your
                        profile.
                    </p>
                </div>
            }
            Footer={<></>}
        />
    );
}
