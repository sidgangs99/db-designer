import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IModalComponentProps } from './types';

export default function ModalComponent(props: IModalComponentProps) {
    const { open, setOpen, Header, Body, Footer, className } = props;
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-20 overflow-y-auto"
                onClose={() => setOpen(false)}
                open={open}
            >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />
                <div className="h-full min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className={`inline-block transform overflow-hidden rounded-2xl bg-stone-900 p-6 text-left align-middle text-white shadow-xl transition-all ${className}`}
                        >
                            {Header && (
                                <Dialog.Title
                                    as="h3"
                                    className="mb-2 px-2 text-lg font-medium leading-6 text-white"
                                >
                                    {Header}
                                </Dialog.Title>
                            )}
                            <div className="accent-coral-darker my-4 h-full w-full p-2 text-sm text-white focus:accent-coral-light">
                                {Body}
                            </div>

                            <div className="mt-8">{Footer}</div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
