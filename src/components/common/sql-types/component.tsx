import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { RiCodeSLine } from 'react-icons/ri';

import { mySqlTypes, sqlInputType, sqlTypeColor } from './constants';

export default function SQLDataTypesDropdown(props: any) {
    const { setValue, watch, constraintsLogic } = props;
    const dataType = watch('dataType');

    const setSelectedDataType = (value: any) => {
        setValue('dataType', value.name);
        constraintsLogic.setDataType(value.name);
    };

    return (
        <Listbox value={dataType} onChange={setSelectedDataType}>
            <div className="relative flex w-full align-middle">
                <Listbox.Button
                    className={`relative flex w-full items-center justify-between space-x-1 border-b py-1 px-2 text-left text-sm transition duration-150 ease-in-out sm:leading-5 ${
                        sqlTypeColor[sqlInputType[dataType]]
                    }`}
                >
                    <div className="block truncate text-sm">{dataType}</div>
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
                        {mySqlTypes.map((sqlType, index) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-pointer px-2 py-1 text-xs hover:bg-grey-main md:text-sm`
                                }
                                value={sqlType}
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
                                            {sqlType.name}
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
