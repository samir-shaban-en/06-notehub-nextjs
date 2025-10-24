import NoteList from '@/componetns/Modal/Modal';
import Modal from '@/componetns/Modal/Modal';
import NoteForm from '@/componetns/NoteForm/NoteForm';

import SearchBox from '@/componetns/SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import Pagination from '@/componetns/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { useState } from 'react';

import css from './App.module.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [text, setText] = useState('');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['notes', currentPage, text],
    queryFn: () => fetchNotes(currentPage, text),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
      setCurrentPage(1);
    },
    1000
  );

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleChange} />

          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}

          <button onClick={openModal} className={css.button}>
            Create note +
          </button>
        </header>
      </div>
      {isError && <ErrorMessage />}

      {isLoading && <Loader />}

      {data?.notes && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default App;
