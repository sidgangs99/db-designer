import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

import useWorkbookStore from '../../store/workbook/state';
import ButtonContainer from '../common/button/container';
import { sqlInputType, sqlTypeColor } from '../common/sql-types/constants';
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

    const { deleteTable, deleteNode, addNewColumnNode } = useWorkbookStore();

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
                    label={'Update'}
                    primary
                />
                <ButtonContainer onClick={onClose} label={'Close'} secondary />
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex h-10 w-full items-center justify-between space-x-2 rounded-sm font-semibold text-white">
                    <div className="flex h-10 w-5/6 items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                        Table Details
                    </div>
                    <div
                        className="flex h-full w-1/6 cursor-pointer items-center justify-center bg-grey-main hover:border hover:border-coral-main hover:text-coral-main"
                        onClick={() => {
                            const tableId = node?.data?.tableId;
                            deleteTable(tableId);
                            onColumnClick(tableId);
                        }}
                    >
                        <MdOutlineDelete
                            className={`flex items-center text-2xl`}
                        />
                    </div>
                </div>
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
                <div className="flex h-10 w-full items-center justify-between space-x-2 rounded-sm font-semibold text-white">
                    <p className="flex h-full w-5/6 items-center justify-start bg-grey-main px-3">
                        Columns
                    </p>
                    <div
                        className="flex h-full w-1/6 cursor-pointer items-center justify-center bg-grey-main hover:border hover:border-coral-main hover:text-coral-main"
                        onClick={() => addNewColumnNode(node.data.tableId)}
                    >
                        <AiOutlineAppstoreAdd className="cursor-pointer text-2xl hover:text-coral-main" />
                    </div>
                </div>
                {columns.map(({ data, id }: any) => (
                    <div className="w-ful flex space-x-2" key={id}>
                        <div
                            className={`flex h-10 w-5/6 cursor-pointer items-center justify-between rounded-sm bg-grey-dark px-3 hover:border hover:border-grey-lighter`}
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
                        <div
                            className="flex w-1/6 cursor-pointer items-center justify-center bg-grey-dark  hover:border hover:border-coral-main hover:text-coral-main"
                            onClick={() => deleteNode(id)}
                        >
                            <MdOutlineDelete
                                className={`flex items-center text-xl`}
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
