/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom';

function Pagination({ perPage, totalTodo, paginate, currentPage }) {
    const pageNumber = [];
    for (var i = 1; i <= Math.ceil(totalTodo / perPage); i++) {
        pageNumber.push(i)
    }
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pageNumber.map(number => {
                        return (
                            <li key={number} className="page-item">
                                <Link
                                    to={`page=${number}`}
                                    className="page-link"
                                    onClick={() => {
                                        paginate(number)
                                        // history.push(`todos?page=${number}`)
                                    }}
                                    style={number === currentPage ? {
                                        color: '#fff',
                                        backgroundColor: '#333',
                                    } : {}}
                                >
                                    {number}
                                </Link>
                            </li>)
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Pagination
