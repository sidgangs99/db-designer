import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { useCallback } from 'react';
import { Tooltip } from 'react-tooltip';
import useWorkbookStore from '../../../store/workbook/state';
import IconButtonContainer from '../../common/icon-button/container';
import ModalContainer from '../../common/modal/container';
import { useSaveWorkbook } from '../../hooks/useSaveWorkbook';

interface ISaveWorkbookModal {
    open: boolean;
    setOpen: any;
}

export default function SaveWorkbookModalComponent(props: ISaveWorkbookModal) {
    const { open, setOpen } = props;
    const { onSubmit } = useSaveWorkbook();
    const { v } = useWorkbookStore();

    const { register, handleSubmit, formState } = useForm({
        mode: 'onChange',
        defaultValues: {
            v,
            commitMessage: 'Added a new table ...'
        }
    });
    const { errors }: any = formState;

    const isTooltipVisible = useCallback(
        (keyName: string) => Object.keys(errors[keyName] || {}).length !== 0,
        [errors]
    );

    const isSaveDisabled = useCallback(
        () => Object.keys(errors).length !== 0,
        [errors]
    );

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'w-2/3'}
            Header={
                <div className="flex items-center justify-between">
                    <div className="flex whitespace-nowrap text-gray-300">
                        Save Workbook
                    </div>
                    <IconButtonContainer
                        label={'Save'}
                        Icon={BiSave}
                        type={'submit'}
                        form={'save-workbook'}
                        disabled={isSaveDisabled()}
                        className={isSaveDisabled() ? 'cursor-not-allowed' : ''}
                    />
                </div>
            }
            Body={
                // isSuccess ? (
                <form
                    className="mt-4 flex w-full flex-col justify-between space-y-8 text-xs md:pr-2 md:text-base"
                    onSubmit={handleSubmit((data: any) => onSubmit(data))}
                    id="save-workbook"
                >
                    <div className="flex w-full items-end space-x-4">
                        <label className="flex w-1/6 font-semibold text-grey-lighter">
                            Commit Message<p className="text-coral-light">*</p>
                        </label>
                        <div
                            className="flex w-4/6 space-x-2 font-normal"
                            data-tooltip-id={`tooltip-commit-message`}
                            data-tooltip-content={
                                errors['commitMessage']?.type === 'required'
                                    ? 'This is a required field'
                                    : 'Max allowed length in 70'
                            }
                        >
                            <input
                                {...register('commitMessage', {
                                    required: true,
                                    maxLength: 70
                                })}
                                type="text"
                                placeholder="Added a new table..."
                                className="outline-border-coral-dark focus:border-coral-darkest w-full border-b border-grey-main bg-stone-900 px-2 font-normal text-white focus:outline-none focus:ring-0"
                            />
                        </div>
                        <Tooltip
                            id={`tooltip-commit-message`}
                            place="bottom"
                            className="bg-coral-light px-6 py-0 align-middle text-black"
                            isOpen={isTooltipVisible('commitMessage')}
                        />
                    </div>
                    <div className="flex w-full items-end space-x-4">
                        <label className="flex w-1/6 font-semibold text-grey-lighter">
                            Version<p className="text-coral-light">*</p>
                        </label>
                        <div
                            className="flex w-1/6 space-x-2 font-normal"
                            data-tooltip-id={`tooltip-v`}
                            data-tooltip-content={`Version should be greater than ${v}`}
                        >
                            <input
                                {...register('v', {
                                    required: true
                                })}
                                type="text"
                                className="outline-border-coral-dark focus:border-coral-darkest border-b border-grey-main bg-stone-900 px-2 font-normal tracking-wider text-white focus:outline-none focus:ring-0"
                            />
                        </div>
                        <Tooltip
                            id={`tooltip-v`}
                            place="bottom"
                            className="bg-coral-light px-6 py-0 align-middle text-black"
                            isOpen={isTooltipVisible('v')}
                        />
                    </div>
                    <div></div>
                </form>
                // ) : (
                //     <LoaderComponent
                //         Component={HashLoader}
                //         speedMultiplier={0.4}
                //     />
                // )
            }
            Footer={<></>}
        />
    );
}
