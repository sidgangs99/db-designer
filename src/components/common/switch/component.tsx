import { Switch } from '@headlessui/react';
import { ISwitchComponentProps } from './types';

export default function SwitchComponent(props: ISwitchComponentProps) {
    const { enabled, onChange, label, isDisabled = false } = props;

    return (
        <div className="flex w-full space-x-4">
            <span className="w-1/4">{label}</span>
            <div className="w-1/4">
                <Switch
                    checked={enabled}
                    onChange={onChange}
                    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'}  ${
                        isDisabled ? 'cursor-not-allowed' : ''
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                    disabled={isDisabled}
                >
                    <span
                        className={`${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
            </div>
        </div>
    );
}
