import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import ButtonContainer from '../common/button/container';
import LoaderComponent from '../common/loader/component';
import TableComponent from '../common/table/components';
import { columns } from './constants';
import { useCreateWorkbook } from './hooks/useCreateWorkbook';
import { useGetUserWorkbooks } from './hooks/useGetUserWorkbooks';

export default function PickWorkbookComponent() {
    const navigate = useNavigate();

    const [selectedColumn, setSelectedColumn] = useState<Record<string, any>>(
        {}
    );
    const newWorkbook = { _id: 'Create new workbook', isNew: true };

    const { isFetching, tableData } = useGetUserWorkbooks();
    const {
        isFetching: isCreatingWorkbook,
        data,
        refetch
    } = useCreateWorkbook();

    useEffect(() => {
        if (data?._id) navigate('/design/' + data?._id);
    }, [data]);

    const RenderListOfWorkbooks = () => {
        const listOfWorkbooks: any = [...tableData];
        if (listOfWorkbooks.length < 3) listOfWorkbooks.push(newWorkbook);

        return (
            <div className="flex flex-col">
                <TableComponent
                    columns={columns}
                    data={listOfWorkbooks}
                    selectedColumn={selectedColumn}
                    setSelectedColumn={setSelectedColumn}
                />
            </div>
        );
    };

    const Body = () =>
        isFetching || isCreatingWorkbook ? (
            <LoaderComponent Component={HashLoader} speedMultiplier={0.4} />
        ) : (
            <RenderListOfWorkbooks />
        );

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center space-y-8 bg-grey-darker">
            <div className="flex w-2/3 justify-between">
                <div className="text-2xl text-coral-main">
                    Select your workbook
                </div>
                <div>
                    <ButtonContainer
                        label="Next"
                        disabled={!selectedColumn?._id}
                        onClick={() => {
                            if (selectedColumn?.isNew) refetch();
                            else navigate('/design/' + selectedColumn?._id);
                        }}
                    />
                </div>
            </div>
            <div className="w-2/3">
                <Body />
            </div>
        </div>
    );
}
