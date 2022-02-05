import { useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateLyricsFormProps } from '../components/form/CreateLyricsForm';
import Lyrics from '../models/Lyrics';
import LyricsClient from '../services/LyricsClient';

interface LyricsHook {
  actions: {
    deleteLyrics: (id: string) => Promise<void>;
    createLyrics: (form: CreateLyricsFormProps) => Promise<void>;
    addLyricsRating: (id: string, rating: number) => Promise<void>;
    addComment: (riffId: string, form: CreateCommentFormProps) => Promise<void>;
    removeComment: (riffId: string, commentId: string) => Promise<void>;
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

  const addComment = async (riffId: string, form: CreateCommentFormProps) => {
    await LyricsClient.addComment(riffId, form);
    queryClient.invalidateQueries('riffs');
  };

  const removeComment = async (riffId: string, commentId: string) => {
    await LyricsClient.removeComment(riffId, commentId);
    queryClient.invalidateQueries('riffs');
  };

  return {
    actions: { deleteLyrics, createLyrics, addLyricsRating, addComment, removeComment },
    selectors: { data, isError, isLoading },
  };
};

export default useLyrics;
