import { useQuery, useQueryClient } from 'react-query';
import { CreateLyricsFormProps } from '../components/riffs/CreateLyricsForm';
import Lyrics from '../models/Lyrics';
import LyricsClient from '../services/LyricsClient';

interface LyricsHook {
  actions: {
    deleteLyrics: (id: string) => void;
    createLyrics: (form: CreateLyricsFormProps) => void;
    addLyricsRating: (id: string, rating: number) => void;
  };
  selectors: {
    data: Lyrics[];
    isError: boolean;
    isLoading: boolean;
  };
}

const useLyrics = (): LyricsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('lyrics', () => LyricsClient.getAll());

  const deleteLyrics = async (id: string) => {
    await LyricsClient.delete(id);
    queryClient.invalidateQueries('lyrics');
  };

  const createLyrics = async (form: CreateLyricsFormProps) => {
    await LyricsClient.create(form);
    queryClient.invalidateQueries('lyrics');
  };

  const addLyricsRating = async (id: string, rating: number) => {
    await LyricsClient.addRating(id, rating);
    queryClient.invalidateQueries('lyrics');
  };

  return {
    actions: { deleteLyrics, createLyrics, addLyricsRating },
    selectors: { data, isError, isLoading },
  };
};

export default useLyrics;
