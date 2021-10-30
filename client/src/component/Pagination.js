/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

function Pagination({ perPage, totalTodo, paginate, currentPage }) {
    const pageNumber = [];
    for (var i = 1; i <= Math.ceil(totalTodo / perPage); i++) {
        pageNumber.push(i)
    }
    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {/* <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
                    {pageNumber.map(number => {
                        return (
                            <li key={number} className="page-item">
                                <button className="page-link"
                                    onClick={() => paginate(number)}
                                    style={number === currentPage ? {
                                        color: '#fff',
                                        backgroundColor: '#333',
                                    } : {}}
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
