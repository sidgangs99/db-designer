import toast from 'react-hot-toast';

export default function ApiToast({ message }: any) {
    return toast.custom((t) => <div className="">{message}</div>, {
        id: 'unique-notification',
        position: 'top-center'
    });
}
