import { Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback } from 'react';

import { uuid } from '../../../util/helper';
import { IMenuComponentProps } from './types';

export default function MenuComponent(props: IMenuComponentProps) {
    const { user, options } = props;

    const { photoURL, displayName }: any = user;

    const getInitials = useCallback(() => {
        const name = displayName.split(' ');
        let initials = name[0][0] + name[1]?.[0];

        if (initials.length === 0) return ':)';

        return initials;
    }, [user]);

    return (
        <Menu as="div" className="relative items-center justify-center">
            <div>
                <Menu.Button className="flex w-full items-center justify-center rounded-md border border-grey-dark text-sm font-medium hover:border-coral-main">
                    {photoURL ? (
                        <img
                            className="h-8 w-8 rounded border border-grey-main"
                            src={photoURL}
                            alt="avatar"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-grey-main">
                            {getInitials()}
                        </div>
                    )}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-20 mt-2 w-24 origin-top-right cursor-pointer divide-y divide-gray-100 rounded-md border border-grey-lighter bg-stone-900 shadow-lg">
                    {options.map(({ label, onClick }: any) => (
                        <Menu.Item key={uuid()}>
                            {({ active }) => (
                                <button
                                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-white hover:bg-grey-dark`}
                                    onClick={onClick}
                                >
                                    {/* {active ? 'a->' : 'i->'} */}
                                    {label}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
