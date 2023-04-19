import { Listbox, Transition } from '@headlessui/react';
import { HiSelector } from 'react-icons/hi';

import { Fragment } from 'react';
import { ISingleSelectDropdownComponentProps } from './types';

export default function SingleSelectDropdownComponent(
    props: ISingleSelectDropdownComponentProps
) {
    const {
        values = [],
        setValue,
        value,
        className,
        Icon,
        optionsClassName
    } = props;

    return (
        <Listbox value={value} onChange={setValue}>
            {({ open }) => (
                <div className="relative flex w-full align-middle">
                    <Listbox.Button
                        className={`relative flex w-full items-center justify-between space-x-1 border-b px-2 py-1 text-left text-sm transition duration-150 ease-in-out sm:leading-5 ${className}`}
                    >
                        {Icon ? <Icon className="text-lg" /> : <></>}
                        <div className="block truncate text-sm">
                            {value?.label}
                        </div>
                        <div className="flex h-full items-center justify-center text-sm">
                            <HiSelector />
                        </div>
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
                            className={`shadow-xs absolute z-20 mt-8 max-h-60 w-full overflow-auto rounded-b-lg border-x border-b border-grey-light bg-grey-dark py-1 text-base leading-6 focus:outline-none sm:leading-5 ${optionsClassName}`}
                        >
                            {values.map((data: any, index: number) => {
                                const { label } = data;
                                return (
                                    <Listbox.Option
                                        key={index}
                                        value={data}
                                        className={({ active }) =>
                                            `relative cursor-pointer px-2 py-1 text-xs hover:bg-grey-main md:text-sm`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <div
                                                className={`block truncate text-sm ${
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal'
                                                }`}
                                            >
                                                {label}
                                            </div>
                                        )}
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
