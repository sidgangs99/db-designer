import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RiCodeSLine } from 'react-icons/ri';

import { sqlTypeColor } from './constants';

export default function SingleSelectDropdownHookFormContainer(props: any) {
    const { setValue, constraintsLogic, keyName, values, keyNameValue } = props;

    const setSelectedDataType = (value: any) => {
        setValue(keyName, value);
        constraintsLogic[keyName] = value;
    };

    return (
        <Listbox value={keyNameValue} onChange={setSelectedDataType}>
            <div className="relative flex w-full align-middle">
                <Listbox.Button
                    className={`relative flex w-full items-center justify-between space-x-1 border-b px-2 py-1 text-left text-sm transition duration-150 ease-in-out sm:leading-5 ${
                        sqlTypeColor[keyNameValue.type]
                    }`}
                >
                    <div className="block truncate text-sm">
                        {keyNameValue?.label}
                    </div>
                    <div className="flex h-full rotate-90 items-center justify-center text-sm">
                        <RiCodeSLine />
                    </div>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="shadow-xs absolute z-10 mt-8 w-full overflow-auto rounded-b-lg border-x border-b bg-grey-dark py-1 text-base leading-6 focus:outline-none sm:leading-5">
                        {values.map((value: any, index: number) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-pointer px-2 py-1 text-xs hover:bg-grey-main md:text-sm`
                                }
                                value={value}
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate text-sm ${
                                                selected
                                                    ? 'font-medium'
                                                    : 'font-normal'
                                            }`}
                                        >
                                            {value.label}
                                        </span>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center px-2 text-sm "></span>
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
