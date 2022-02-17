import { UseMutateFunction, useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateLyricsFormProps } from '../components/form/CreateLyricsForm';
import Lyrics from '../models/Lyrics';
import LyricsClient from '../services/LyricsClient';

export interface AddRatingProps {
  id: string;
  rating: number;
}

export interface AddCommentProps {
  riffId: string;
  form: CreateCommentFormProps;
}

export interface RemoveCommentProps {
  riffId: string;
  commentId: string;
}

interface LyricsHook {
  actions: {
    deleteLyrics: UseMutateFunction<void, unknown, string, unknown>;
    createLyrics: UseMutateFunction<void, unknown, CreateLyricsFormProps, unknown>;
    addLyricsRating: UseMutateFunction<void, unknown, AddRatingProps, unknown>;
    addComment: UseMutateFunction<void, unknown, AddCommentProps, unknown>;
    removeComment: UseMutateFunction<void, unknown, RemoveCommentProps, unknown>;
  };
  selectors: {
    data: Lyrics[];
    isError: boolean;
    isLoading: boolean;
    isCreateLyricsSuccess: boolean;
    isCreateLyricsError: boolean;
    isCreateLyricsLoading: boolean;
    isAddLyricsRatingSuccess: boolean;
    isAddLyricsRatingError: boolean;
    isAddLyricsRatingLoading: boolean;
    isAddCommentSuccess: boolean;
    isAddCommentError: boolean;
    isAddCommentLoading: boolean;
    isRemoveCommentSuccess: boolean;
    isRemoveCommentError: boolean;
    isRemoveCommentLoading: boolean;
  };
}

const useLyrics = (): LyricsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('lyrics', () => LyricsClient.getAll());

  const { mutate: deleteLyrics } = useMutation('deleteLyrics', async (id: string) => {
    await LyricsClient.delete(id);
    queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: createLyrics,
    isSuccess: isCreateLyricsSuccess,
    isError: isCreateLyricsError,
    isLoading: isCreateLyricsLoading,
  } = useMutation('createLyrics', async (form: CreateLyricsFormProps) => {
    await LyricsClient.create(form);
    queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: addLyricsRating,
    isSuccess: isAddLyricsRatingSuccess,
    isError: isAddLyricsRatingError,
    isLoading: isAddLyricsRatingLoading,
  } = useMutation('addLyricsRating', async ({ id, rating }: AddRatingProps) => {
    await LyricsClient.addRating(id, rating);
    queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: addComment,
    isSuccess: isAddCommentSuccess,
    isError: isAddCommentError,
    isLoading: isAddCommentLoading,
  } = useMutation('addComment', async ({ riffId, form }: AddCommentProps) => {
    await LyricsClient.addComment(riffId, form);
    queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: removeComment,
    isSuccess: isRemoveCommentSuccess,
    isError: isRemoveCommentError,
    isLoading: isRemoveCommentLoading,
  } = useMutation('removeComment', async ({ riffId, commentId }: RemoveCommentProps) => {
    await LyricsClient.removeComment(riffId, commentId);
    queryClient.invalidateQueries('lyrics');
  });

  return {
    actions: { deleteLyrics, createLyrics, addLyricsRating, addComment, removeComment },
    selectors: {
      data,
      isError,
      isLoading,
      isCreateLyricsSuccess,
      isCreateLyricsError,
      isCreateLyricsLoading,
      isAddLyricsRatingSuccess,
      isAddLyricsRatingError,
      isAddLyricsRatingLoading,
      isAddCommentSuccess,
      isAddCommentError,
      isAddCommentLoading,
      isRemoveCommentSuccess,
      isRemoveCommentError,
      isRemoveCommentLoading,
    },
  };
};

export default useLyrics;
