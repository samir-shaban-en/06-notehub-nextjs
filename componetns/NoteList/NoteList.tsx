import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';

import { type Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}
const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutationDeleteNote = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {},
  });

  const deleteNoteHendler = (noteId: string) => {
    mutationDeleteNote.mutate(noteId);
  };
  return (
    <ul className={css.list}>
      {notes.map((item) => {
        return (
          <li key={item.id} className={css.listItem}>
            <h2 className={css.title}>{item.title}</h2>
            <p className={css.content}>{item.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{item.tag}</span>
              <button
                onClick={() => deleteNoteHendler(item.id)}
                className={css.button}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
