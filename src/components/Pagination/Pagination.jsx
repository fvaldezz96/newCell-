import React from 'react'
import './Pagination.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SlArrowLeft } from "react-icons/sl"
import { SlArrowRight } from "react-icons/sl";
export default function Pagination({ postPerPage, totalPosts, paginate, currentPage }) {
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const handlePage = (pageNumber) => {
    paginate(pageNumber)
  }
  return (
    <nav aria-label="Page navigation example ">
      <ul className="pagination justify-content-center custom-pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="icons back page"
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <SlArrowLeft />
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? 'active' : ''}`}
            onClick={() => handlePage(page)}
          >
            <a className="page-link" href="img not found">
              {page}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a
            className="page-link"
            href="icons next page"
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <SlArrowRight />
          </a>
        </li>
      </ul>
    </nav>
  )
}
