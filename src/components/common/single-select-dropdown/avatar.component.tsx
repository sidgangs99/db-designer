import { Listbox, Transition } from '@headlessui/react';

import { Fragment, useCallback } from 'react';
import useAuthStore from '../../../store/firebase/state';

export default function AvatarDropdownComponent(props: any) {
    const { values } = props;
    const { user } = useAuthStore();

    const { photoURL, displayName }: any = user;

    const getInitials = useCallback(() => {
        const name = displayName.split(' ');
        let initials = name[0][0] + name[1]?.[0];

        if (initials.length === 0) return ':)';

        return initials;
    }, [user]);

    return (
        <Listbox>
            {({ open }) => (
                <div className="relative flex w-full align-middle">
                    <Listbox.Button
                        className={`relative flex w-full items-center justify-between space-x-1 px-2 py-1 text-left text-sm transition duration-150 ease-in-out sm:leading-5`}
                    >
                        {photoURL ? (
                            <img
                                className="h-8 w-8 rounded ring-grey-light hover:ring-1"
                                src={photoURL}
                                alt="avatar"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-grey-main">
                                {getInitials()}
                            </div>
                        )}
                    </Listbox.Button>

                    <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        as={Fragment}
                    >
                        <Listbox.Options
                            static
                            className={`shadow-xs absolute z-20 -ml-7 mt-10 max-h-60 w-auto overflow-auto rounded-md border border-x border-grey-light bg-grey-darker text-base leading-6 focus:outline-none sm:leading-5`}
                        >
                            {values.map((data: any, index: number) => {
                                const { label, onClick } = data;
                                return (
                                    <Listbox.Option
                                        key={index}
                                        value={data}
                                        className={({ active }) =>
                                            `relative m-1 cursor-pointer rounded-md px-2 py-1 text-xs hover:bg-grey-main md:text-sm`
                                        }
                                        onClick={onClick}
                                    >
                                        <div
                                            className={`block truncate text-sm`}
                                        >
                                            {label}
                                        </div>
                                    </Listbox.Option>
                                );
                            })}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    );
}
