import { useTable } from 'react-table';

export default function TableComponent(props: any) {
    const { columns, data, selectedColumn, setSelectedColumn } = props;

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data
        });

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup, index) => (
                    <tr
                        className="border-2 border-grey-main p-2"
                        {...headerGroup.getHeaderGroupProps()}
                    >
                        {headerGroup.headers.map((column) => (
                            <th
                                className="px-4 py-2 text-left text-grey-lighter"
                                {...column.getHeaderProps()}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody
                className="group border-2 border-grey-main p-2 "
                {...getTableBodyProps()}
            >
                {rows.map((row, i) => {
                    prepareRow(row);
                    const isSelected =
                        // @ts-ignore
                        selectedColumn?._id === row?.original?._id;
                    return (
                        <tr
                            className={`p-2 group-hover:cursor-pointer ${
                                isSelected && 'bg-grey-main'
                            } hover:bg-grey-dark`}
                            {...row.getRowProps()}
                            onClick={() => setSelectedColumn(row?.original)}
                        >
                            {row.cells.map((cell) => (
                                <td
                                    className="px-4 py-2"
                                    {...cell.getCellProps()}
                                >
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
