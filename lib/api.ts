import axios from 'axios';
import { type Note } from '@/types/note';
import { type NewNote } from '@/types/note';
const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const options = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${myKey}`,
  },
};

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
const fetchNotes = async (
  currentPage: number,
  text: string
): Promise<NotesResponse> => {
  const { data } = await axios.get<NotesResponse>(
    `https://notehub-public.goit.study/api/notes?search=${text}&page=${currentPage}&perPage=12`,
    options
  );

  return {
    notes: data.notes,
    totalPages: data.totalPages,
  };
};

const createNote = async (values: NewNote): Promise<Note> => {
  const res = await axios.post<Note>(
    'https://notehub-public.goit.study/api/notes',
    values,
    options
  );

  return res.data;
};

const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    options
  );

  return res.data;
};

const getSingleNote = async (noteId: string): Promise<Note> => {
  const res = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    options
  );

  return res.data;
};

export { fetchNotes, createNote, deleteNote, getSingleNote };
