import { Switch } from '@headlessui/react';
import { Tooltip } from 'react-tooltip';

import { ISwitchComponentProps } from './types';

export default function SwitchComponent(props: ISwitchComponentProps) {
    const {
        enabled,
        onChange,
        label,
        isDisabled = false,
        disabledTooltipMessage = ''
    } = props;

    return (
        <>
            <div className="flex h-10 w-full items-center justify-between rounded-sm bg-grey-dark px-4">
                <span className="w-2/4">{label}</span>
                <div
                    className="w-2/4"
                    data-tooltip-id={`switch-tooltip-${label}`}
                    data-tooltip-content={disabledTooltipMessage}
                >
                    <Switch
                        checked={enabled}
                        onChange={onChange}
                        className={`${
                            enabled ? 'bg-blue-600' : 'bg-gray-200'
                        }  ${
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
            {isDisabled && (
                <Tooltip
                    id={`switch-tooltip-${label}`}
                    place="right"
                    className="bg-chelsea-cucumber-500 w-40 align-middle"
                />
            )}
        </>
    );
}
