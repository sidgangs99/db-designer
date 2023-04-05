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
            // onSubmit={handleSubmit(onSubmit)}
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
                <label className="flex h-10 w-full items-center rounded-sm bg-grey-main px-2 font-semibold text-white">
                    Columns
                </label>
                {columns.map(({ data, id }) => (
                    <div
                        className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-sm bg-grey-dark px-3 hover:border hover:border-grey-lighter`}
                        onClick={() => onColumnClick(id)}
                    >
                        <div>{data?.columnName}</div>
                        <div
                            className={`flex w-2/5 items-center ${
                                sqlTypeColor[sqlInputType[data?.dataType]]
                            }`}
                        >
                            {data?.dataType}
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
                    keyName={'additional.info'}
                    label={'Notes'}
                    type={'textarea'}
                />
            </div>
        </form>
    );
};

export default RightSidebarTableComponent;
