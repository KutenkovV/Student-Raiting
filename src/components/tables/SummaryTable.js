import React from 'react'
import "../LoadTable/LoadTable.css"
import usePagination from "../../hooks/usePagination";

const SummaryTable = ({ data, itemsPerPage, startFrom }) => {
    const { slicedData, pagination, prevPage, nextPage, changePage } =
        usePagination({ itemsPerPage, data, startFrom });

    return (
        <>
            <table className='tableSummary'>
                <thead>
                    <tr>
                        <th>Направление</th>
                        <th>Всего подано</th>
                        <th>Количество стипендий</th>
                        <th>Граница баллов</th>
                        <th>Следующий балл</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((item) => (
                        <tr key={item.direction}>
                            <td>{item.direction}</td>
                            <td>{item.total}</td>
                            <td>{item.totalStipend}</td>
                            <td>{item.scorePoint}</td>
                            <td>{item.nextPoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SummaryTable