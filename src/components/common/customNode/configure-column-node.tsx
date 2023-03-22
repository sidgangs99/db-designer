import { useForm } from 'react-hook-form';
import { ITableData } from '../../../store/nodes/types';
import ButtonContainer from '../buttons/container';
import SQLDataTypesDropdown from '../sql-types/component';

// Header
export function ConfigureColumnNodeHeader({
    tableName
}: {
    tableName: string;
}) {
    return <div className="uppercase">{tableName}</div>;
}

interface IConfigureColumnNodeBodyP {
    data: ITableData;
    id: string;
    setOpenModal: Function;
}

// Body
export function ConfigureColumnNodeBody(node: IConfigureColumnNodeBodyP) {
    const { data, id, setOpenModal } = node;
    const { columnName, dataType } = data;

    const { register, watch, getValues, setValue, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: { columnName, dataType }
    });

    const onSubmit: any = (_data: any) => {
        const newNode = { ...data, ..._data };
        setOpenModal(false);
        newNode.updateNode(newNode, id);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="editTableColumn">
            <div className="flex-col space-y-4">
                <div className="flex w-full justify-between">
                    <label className="w-1/2">Column Name: </label>
                    <input
                        {...register('columnName', { required: true })}
                        className="w-1/2 rounded-lg border border-black py-1 px-2 outline-corduroy-300"
                    />
                </div>
                <div className="flex w-full justify-between">
                    <label className="w-1/2">Data Type: </label>
                    <div className="w-1/2">
                        <SQLDataTypesDropdown
                            getValues={getValues}
                            watch={watch}
                            setValue={setValue}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

// Buttons
export const configureColumnNodeButtons = [
    <ButtonContainer
        label={'Save'}
        onClose={() => {}}
        type={'submit'}
        form={'editTableColumn'}
    />,
    <ButtonContainer label={'Cancel'} onClose={() => {}} />
];
