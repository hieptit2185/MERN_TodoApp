/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useHistory } from 'react-router-dom';

function Pagination({ perPage, totalTodo, paginate, currentPage, status, sortTime }) {
    const pageNumber = [];
    for (var i = 1; i <= Math.ceil(totalTodo / perPage); i++) {
        pageNumber.push(i)
    }
    const history = useHistory();
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pageNumber.map((number) => {
                        return (
                            <li key={number} className=" page-item">
                                <button
                                    className={currentPage ? "page-link pageActive" : "page-link"}
                                    onClick={() => {
                                        paginate(number)
                                        history.push(
                                            (status && sortTime) || status || sortTime ? { search: `?page=${number}&filter=${status}&sortBy=${sortTime}` } :
                                                { search: `?page=${number}` }
                                        )
                                    }}
                                >
                                    {number}
                                </button>
                            </li>)
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Pagination
