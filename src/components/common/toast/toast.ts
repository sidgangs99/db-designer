import toast, { ToastPosition } from 'react-hot-toast';

export const darkToast = ({
    message,
    position = 'bottom-right',
    className
}: {
    message: string;
    position?: ToastPosition;
    className?: React.ComponentProps<'div'>['className'];
}) =>
    toast(message, {
        position,
        className: `px-6 py-1 text-sm ${className}`,
        style: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            color: '#FFFFFF'
        }
    });
