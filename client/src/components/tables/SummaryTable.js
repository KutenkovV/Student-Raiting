import React from 'react'
import "../LoadTable/LoadTable.css"
import usePagination from "../../hooks/usePagination";

const SummaryTable = ({ data, itemsPerPage, startFrom }) => {

    const { slicedData, pagination, prevPage, nextPage, changePage } =
        usePagination({ itemsPerPage, data, startFrom });

    if (data.length === 0)
        return <div>Загрузите данные</div> // Сюда по хорошему заглушку какую-нибудь

    return (
        <>
            <table className='tableSummary'>
                <thead>
                    <tr>
                        <th>Направление</th>
                        <th>Всего подано</th>
                        <th>Количество вакансий</th>
                        <th>Количество получивших</th>
                        <th>Граница баллов</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((item) => (
                        <tr key={item.title} className="loadTr">
                            <td>{item.title}</td>
                            <td>{item.totalSubmitted}</td>
                            <td>{item.count}</td>
                            <td>{item.numberReceived}</td>
                            <td>{item.borderPoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default SummaryTable