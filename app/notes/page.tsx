import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteClient from './Notes.client';
type NoteDetailsProps = {
  params: Promise<{ text: string; currentPage: number }>;
};
const App = async ({ params }: NoteDetailsProps) => {
  const { text, currentPage } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', currentPage, text],
    queryFn: () => fetchNotes(currentPage, text),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
};

export default App;
