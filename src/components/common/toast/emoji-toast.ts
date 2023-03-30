import toast from 'react-hot-toast';

export const emojiToast = (message: string, icon: string, className?: string) =>
    toast(message, {
        icon,
        className: `bg-lime-200 px-8 py-2 font-semibold text-slate-700 ${className}`
    });
