import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { RiCodeSLine } from 'react-icons/ri';

import { sqlTypes } from './constants';

export default function SQLDataTypesDropdown(props: any) {
    const { setValue, watch, constraintsLogic } = props;
    const dataType = watch('dataType');

    useEffect(() => {
        setValue('dataType', dataType || sqlTypes[0].name);
    }, []);

    const setSelectedDataType = (value: any) => {
        setValue('dataType', value.name);
        constraintsLogic.setDataType(value.name);
    };

    return (
        <Listbox value={dataType} onChange={setSelectedDataType}>
            <div className="relative align-middle">
                <Listbox.Button className="relative flex w-full items-center justify-between space-x-1 border-b border-coral-darker px-1 py-1 text-left text-sm text-coral-darker transition duration-150 ease-in-out  hover:from-coral-darkest hover:via-coral-dark hover:to-coral-darkest hover:text-black dark:hover:text-coral-darker dark:hover:shadow-md dark:hover:shadow-coral-dark sm:leading-5">
                    <div className="block truncate text-sm">{dataType}</div>
                    <div className="flex h-full rotate-90 items-center justify-center text-xs">
                        <RiCodeSLine />
                    </div>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="shadow-xs absolute w-full overflow-auto rounded-b-lg border-x border-b bg-white py-1 text-base leading-6 focus:outline-none dark:border-coral-dark dark:bg-stone-900 sm:leading-5">
                        {sqlTypes.map((sqlType, index) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `dark:text-coral-black relative cursor-pointer px-2 py-1 text-sm text-black dark:border-coral-dark dark:bg-stone-900 dark:text-coral-darker dark:hover:bg-coral-darkest dark:hover:text-black 
                                    sm:text-sm`
                                }
                                value={sqlType}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate text-xs ${
                                                selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                            }`}
                                        >
                                            {sqlType.name}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center px-2 text-xs text-amber-600"></span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
}
