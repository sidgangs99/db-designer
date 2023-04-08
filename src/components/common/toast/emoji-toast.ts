import toast, { ToastPosition } from 'react-hot-toast';

export const emojiToast = ({
    message,
    emoji,
    position = 'bottom-right',
    className
}: {
    message: string;
    emoji: string;
    position?: ToastPosition;
    className?: React.ComponentProps<'div'>['className'];
}) =>
    toast(message, {
        icon: emoji,
        position,
        className: `bg-lime-200 px-8 py-2 font-semibold text-slate-700 ${className}`
    });
