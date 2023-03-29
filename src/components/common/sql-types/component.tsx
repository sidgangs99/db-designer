import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { RiCodeSLine } from 'react-icons/ri';

import { uuid } from '../../../util/helper';
import { sqlTypes } from './constants';

export default function SQLDataTypesDropdown(props: any) {
    const { setValue, watch, constraintsLogic } = props;
    const dataType = watch('dataType');

    useEffect(() => {
        setValue('dataType', dataType || sqlTypes[0].name);
    }, []);

    const setSelectedDataType = (value: any) => {
        setValue('dataType', value.name);
        constraintsLogic.updateDataType(value.name);
    };

    return (
        <Listbox value={dataType} onChange={setSelectedDataType}>
            <div className="relative align-middle">
                <Listbox.Button className="relative flex h-full w-full cursor-pointer justify-between rounded-lg border  border-chelsea-cucumber-400 bg-white py-1 pl-2 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-corduroy-300 ">
                    <div className="block truncate text-sm">{dataType}</div>
                    <div className="flex h-full rotate-90 items-center justify-center px-2 py-1 text-xs">
                        <RiCodeSLine />
                    </div>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 h-64 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5">
                        {sqlTypes.map((sqlType) => (
                            <Listbox.Option
                                key={uuid()}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none p-2 ${
                                        active
                                            ? 'bg-chelsea-cucumber-50 text-corduroy-900'
                                            : 'text-corduroy-600'
                                    }`
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
