import React from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';

const PaginationComponent = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <PaginationContainer>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={pageCount * 10}
        pageRangeDisplayed={5}
        onChange={onPageChange}
        prevPageText={'<'}
        nextPageText={'>'}
        firstPageText={'<<'}
        lastPageText={'>>'}
        itemClass={'page-item'}
        linkClass={'page-link'}
        prevPageClassName={'page-item'}
        nextPageClassName={'page-item'}
        firstPageClassName={'page-item'}
        lastPageClassName={'page-item'}
        disabledClass={'disabled'}
        activeClass={'active'}
      />
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
  }

  .page-item {
    margin: 0 5px;
    cursor: pointer;
    color: #333;
  }

  .page-link {
    color: #333;
  }

  .active .page-link {
    font-weight: bold;
    color: #000;
  }

  .disabled .page-link {
    pointer-events: none;
    color: #999;
  }
`;

export default PaginationComponent;
