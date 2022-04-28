import React from 'react'
import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table'
import NIDlist from '../Data/NIDlist.json'
import { COLUMNS } from '../Columns'
import './table.css'

export const PaginationTable = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => NIDlist, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        pageSize,
        state,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 15 }
        },
        usePagination
    )

    const { pageIndex } = state


    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) =>
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>

                            )}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* блок с пагинацией */}
            <nav className="pagination justify-content-end p-4">
                <a class="page-link" href="#" onClick={() => previousPage()} disabled={!canPreviousPage} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>

                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>

                <a class="page-link" href="#" onClick={() => nextPage()} disabled={!canNextPage} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </nav>
        </>
    )
}

export default PaginationTable