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
            className="w-2/5"
            Header={
                <div className="my-6 flex whitespace-nowrap text-4xl">
                    Hi
                    <p className="pl-4 text-coral-main">{user?.displayName}</p>,
                </div>
            }
            Body={
                <div className="flex justify-start space-x-2 p-0">
                    <p className="text-xl">
                        Stay tuned for exciting updates to your profile. <br />
                        Your profile is getting a makeover - watch this space!
                    </p>
                </div>
            }
            Footer={<></>}
        />
    );
}
