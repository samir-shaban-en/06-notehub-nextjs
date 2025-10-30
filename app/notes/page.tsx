import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from '@/app/notes/Notes.client';
type NoteDetailsProps = {
  params?: { text?: string; currentPage?: number };
};
const App = async ({ params }: NoteDetailsProps) => {
  const currentPage = params?.currentPage ?? 1;
  const text = params?.text ?? '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentPage, text],
    queryFn: () => fetchNotes(currentPage, text),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialPage={currentPage} initialtext={text} />
    </HydrationBoundary>
  );
};

export default App;
