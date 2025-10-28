import ReactPaginate from 'react-paginate';
import style from '../Pagination/Pagination.module.css';

interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}

const Pagination = ({
  setCurrentPage,
  currentPage,
  totalPages,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={style.pagination}
      activeClassName={style.active}
      nextLabel='→'
      previousLabel='←'
    />
  );
};

export default Pagination;
