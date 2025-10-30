'use client';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import SearchBox from '@/components/SearchBox/SearchBox';

import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { useState } from 'react';

import css from './NotesPage.module.css';
type NotesClientProps = {
  initialPage: number;
  initialText: string;
};
function NotesClient({ initialPage, initialText }: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [text, setText] = useState(initialText);
  const [searchQuery, setSearchQuery] = useState(initialText);

  const { data, isError, error } = useQuery({
    queryKey: ['notes', currentPage, searchQuery],
    queryFn: () => fetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1000);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            onChange={(e) => {
              setText(e.target.value);
              handleChange(e.target.value);
            }}
            value={text}
          />

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
      {isError && <p>Could not fetch the list of notes. {error.message}</p>}

      {data?.notes && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default NotesClient;
