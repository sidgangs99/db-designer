import toast, { ToastPosition } from 'react-hot-toast';
import { customColors } from './../../../colors';

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
        className: `rounded-md border px-6 py-1 text-xs ${className}`,
        style: {
            backgroundColor: customColors.grey.darker,
            borderColor: customColors.grey.main,
            color: '#FFFFFF'
        }
    });
