import React, { useState,useEffect,useCallback } from 'react';
import PropTypes from 'prop-types';
import './app.css';

const PREVIOUS_PAGE = 'PREV';
const NEXT_PAGE= 'NEXT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

function  Pagination(props) {
  const [currentPage,setCurrentPage]  = useState(1);
  const { totalRecords = null, pageLimit = 30, pageRangeDisplayed = 0 } = props;
  const totalPages = Math.ceil(totalRecords / pageLimit);

  useEffect(()=> {
    gotoPage(1);
  },[]);
  
  const gotoPage = useCallback(
    page => {
      setCurrentPage(page);
      props.onChangePage(page);
    },
    [currentPage]
  );

  const setPage = page => event => {
    event.preventDefault();
     gotoPage(page);
  }  

  const getPager = () => {

    const totalItems = (pageRangeDisplayed * 2) + 3;
    const totalBlocks = totalItems + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageRangeDisplayed);
      const endPage = Math.min(totalPages - 1, currentPage + pageRangeDisplayed);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalItems - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [PREVIOUS_PAGE, ...extraPages, ...pages];
          break;
        }

        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, NEXT_PAGE];
          break;
        }

        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [PREVIOUS_PAGE, ...pages, NEXT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];

    }

    return range(1, totalPages);

  }

    if (!totalRecords || totalPages === 1) return null;

    const pages = getPager();
    
    return (
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            { pages.map((page, index) => {

              if (page === PREVIOUS_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Previous" onClick={setPage(1)}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
              );

              if (page === NEXT_PAGE) return (
                <li key={index} className="page-item">
                  <a className="page-link" href="#" aria-label="Next" onClick={setPage(totalPages)}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              );
              return (
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <a className="page-link" href="#" onClick={ setPage(page) }>{ page }</a>
                </li>
              );

            }) }

          </ul>
        </nav>
    );

  }

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onChangePage: PropTypes.func
};

export default Pagination;
