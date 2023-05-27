import { HashLoader } from 'react-spinners';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonContainer from '../common/button/container';
import LoaderComponent from '../common/loader/component';
import TableComponent from '../common/table/components';
import { columns } from './constants';
import { useGetUserWorkbooks } from './hooks/useGetUserWorkbooks';

export default function PickWorkbookComponent() {
    const navigate = useNavigate();
    const [selectedColumn, setSelectedColumn] = useState<Record<string, any>>(
        {}
    );

    const { isFetching, tableData } = useGetUserWorkbooks();

    const NewWorkbook = () => <div>Create new workbook</div>;
    const RenderListOfWorkbooks = () => (
        <div className="flex flex-col">
            <TableComponent
                columns={columns}
                data={tableData}
                selectedColumn={selectedColumn}
                setSelectedColumn={setSelectedColumn}
            />
        </div>
    );

    const Body = () =>
        isFetching ? (
            <LoaderComponent Component={HashLoader} speedMultiplier={0.4} />
        ) : tableData.length ? (
            <RenderListOfWorkbooks />
        ) : (
            <NewWorkbook />
        );

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center space-y-8 bg-grey-darker">
            <div className="flex w-2/3 justify-between">
                <div className="text-2xl text-coral-main">
                    Select your workbook
                </div>
                <div>
                    <ButtonContainer
                        label="Open"
                        disabled={!selectedColumn?._id}
                        onClick={() =>
                            navigate('/design/' + selectedColumn?._id)
                        }
                    />
                </div>
            </div>
            <div className="w-2/3">
                <Body />
            </div>
        </div>
    );
}
