import React from 'react';
import Pagination from 'react-js-pagination';
import styled from 'styled-components';

const PaginationComponent = ({ pageCount, currentPage, setCurrentPage }) => {
  return (
    <PaginationContainer>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={pageCount * 10}
        pageRangeDisplayed={5}
        onChange={setCurrentPage}
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
    margin-bottom:147px;
    gap: 17.64px;
  }

  .page-item {
    cursor: pointer;
    color: #333;
  }

  .page-link {
    color: #BABABA;
  }

  .active .page-link {
    color: #15521D;
  }

  .disabled .page-link {
    pointer-events: none;
    color: #333;
  }
`;

export default PaginationComponent;
