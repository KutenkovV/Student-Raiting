import React from 'react'
import "../LoadTable/LoadTable.css"
import usePagination from "../../hooks/usePagination";
const FinalTable = ({ data, itemsPerPage, startFrom }) => {
    const { slicedData, pagination, prevPage, nextPage, changePage } =
        usePagination({ itemsPerPage, data, startFrom });

    return (
        <>
            <table className='tableFinal'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Баллы</th>
                        <th>Направление</th>
                        <th>Фио</th>
                        <th>Группа</th>
                        <th>Институт</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.points}</td>
                            <td>{item.direction}</td>
                            <td>{item.fio}</td>
                            <td>{item.group}</td>
                            <td>{item.institute}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default FinalTable