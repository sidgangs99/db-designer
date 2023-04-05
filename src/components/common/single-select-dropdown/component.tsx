import { Listbox, Transition } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';

import { ISingleSelectDropdownComponentProps } from './types';

export default function SingleSelectDropdownComponent(
    props: ISingleSelectDropdownComponentProps
) {
    const { values, setValue, value, className, Icon } = props;

    return (
        <div
            className={`z-10 flex w-full items-center justify-center ${className}`}
        >
            <div className="w-full">
                <Listbox
                    as="div"
                    className="space-y-1"
                    value={value}
                    onChange={setValue}
                >
                    {({ open }) => (
                        <>
                            <div className="relative">
                                <span className="w-full rounded-md">
                                    <Listbox.Button className="relative flex w-full items-center justify-center space-x-1 rounded-lg border border-grey-main p-1 text-left text-sm text-coral-main transition duration-150 ease-in-out hover:border-coral-main sm:leading-5">
                                        <span className="flex items-center justify-center space-x-1">
                                            {Icon ? (
                                                <Icon className="text-lg" />
                                            ) : (
                                                <></>
                                            )}
                                            <p>{value}</p>
                                        </span>
                                        <span className="pl-2">
                                            <HiSelector />
                                        </span>
                                    </Listbox.Button>
                                </span>

                                <Transition
                                    show={open}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    className="absolute mt-0.5 w-full rounded-md text-sm"
                                >
                                    <Listbox.Options
                                        static
                                        className="shadow-xs max-h-60 overflow-auto rounded-lg border border-grey-main bg-grey-darker py-2 text-base leading-6 focus:outline-none sm:leading-5"
                                    >
                                        {values.map(({ label, value }) => (
                                            <Listbox.Option
                                                key={value}
                                                value={value}
                                            >
                                                {({ selected, active }) => (
                                                    <div
                                                        className={`relative cursor-pointer px-2 py-1.5 text-xs hover:bg-grey-dark sm:text-sm`}
                                                    >
                                                        <span
                                                            className={`${
                                                                selected
                                                                    ? 'font-semibold'
                                                                    : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {label}
                                                        </span>
                                                    </div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
            </div>
        </div>
    );
}
