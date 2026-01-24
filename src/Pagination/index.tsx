import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage:number;
 onChangePage: any;
}

const Pagination : React.FC<PaginationProps>= ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel={
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      }
      previousLabel={
        <span className={styles.arrow} aria-hidden="true">
          ←
        </span>
      }
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
