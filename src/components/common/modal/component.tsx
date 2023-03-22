import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IModalComponentProps } from './types';

export default function ModalComponent(props: IModalComponentProps) {
    const { open, onClose, Header, Body, Footer } = props;
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="z-1000 fixed inset-0 overflow-y-auto"
                onClose={onClose}
            >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
                <div className="h-full px-4 text-center">
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
                        <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                {Header}
                            </Dialog.Title>
                            <div className="mt-2">
                                <div className="border-t pt-2 text-sm text-gray-500">
                                    {Body}
                                </div>
                            </div>

                            <div className="mt-4">{Footer}</div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}
