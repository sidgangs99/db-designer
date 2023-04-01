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
                                <span className="w-full rounded-md shadow-sm">
                                    <Listbox.Button className="focus:shadow-outline-blue relative flex w-full items-center justify-center space-x-1 rounded-md border border-gray-300 bg-white p-1 text-left text-sm text-chelsea-cucumber-900 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:leading-5">
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
                                    className="absolute mt-0.5 w-full rounded-md bg-white shadow-lg"
                                >
                                    <Listbox.Options
                                        static
                                        className="shadow-xs max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                                    >
                                        {values.map(({ label, value }) => (
                                            <Listbox.Option
                                                key={value}
                                                value={value}
                                            >
                                                {({ selected, active }) => (
                                                    <div
                                                        className={`${
                                                            active
                                                                ? 'bg-yellow-lighter'
                                                                : 'text-gray-900'
                                                        } relative cursor-pointer select-none px-2 py-1 hover:bg-chelsea-cucumber-100`}
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
