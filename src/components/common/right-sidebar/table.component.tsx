import { MdOutlineDelete } from 'react-icons/md';
import { VscDiffAdded } from 'react-icons/vsc';

import ButtonContainer from '../button/container';
import { sqlInputType, sqlTypeColor } from '../sql-types/constants';
import TextAreaInput from './textAreaInput';
import TextInput from './textInput';
import { IRightSidebarTableProps } from './types';

const RightSidebarTableComponent = (props: IRightSidebarTableProps) => {
    const {
        node,
        columns,
        handleSubmit,
        onSubmit,
        onClose,
        register,
        errors,
        onColumnClick
    } = props;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            id="editTableColumn"
            className="flex-col space-y-6 py-4"
        >
            <div className="flex w-full justify-between">
                <ButtonContainer
                    type={'submit'}
                    form={'editTableColumn'}
                    label={'Save'}
                    primary
                />
                <ButtonContainer onClick={onClose} label={'Close'} secondary />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Table Details
                </label>
                <TextInput
                    register={register}
                    errors={errors}
                    keyName="tableName"
                    label={'Name'}
                    pattern={/^[^\s]+$/}
                    required
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="flex h-10 w-full items-center justify-between rounded-sm bg-grey-main px-2 font-semibold text-white">
                    <p>Columns</p>
                    <VscDiffAdded
                        className="cursor-pointer text-2xl hover:text-coral-main"
                        onClick={() =>
                            node?.data?.addNewNode(node?.data, node?.id)
                        }
                    />
                </label>
                {columns.map(({ data, id }: any) => (
                    <div className="w-ful flex space-x-2">
                        <div
                            className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-sm bg-grey-dark px-3 hover:border hover:border-grey-lighter`}
                            onClick={() => onColumnClick(id)}
                        >
                            <div className={`flex w-2/5 items-center`}>
                                {data?.columnName}
                            </div>
                            <div
                                className={`flex w-2/5 items-center justify-between`}
                            >
                                <p
                                    className={` ${
                                        sqlTypeColor[
                                            sqlInputType[data?.dataType]
                                        ]
                                    }`}
                                >
                                    {data?.dataType}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-1/5 cursor-pointer items-center justify-center bg-grey-dark  hover:border hover:border-coral-main hover:text-coral-main">
                            <MdOutlineDelete
                                className={`flex items-center text-xl`}
                                onClick={() => node?.data?.onDeleteNode(id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col space-y-2">
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Additional Info
                </label>
                <TextAreaInput
                    register={register}
                    errors={errors}
                    keyName={'additional.notes'}
                    label={'Notes'}
                />
            </div>
        </form>
    );
};

export default RightSidebarTableComponent;
