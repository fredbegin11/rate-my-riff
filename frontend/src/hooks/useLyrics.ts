import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateLyricsFormProps } from '../components/form/CreateLyricsForm';
import Lyrics from '../models/Lyrics';
import LyricsClient from '../services/LyricsClient';
import { HookAction } from './HookAction';

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
    delete: HookAction;
    create: HookAction;
    addRating: HookAction;
    addComment: HookAction;
    removeComment: HookAction;
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

  const {
    mutate: deleteLyrics,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useMutation('deleteLyrics', async (id: string) => {
    await LyricsClient.delete(id);
    queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: create,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isLoading: isCreateLoading,
  } = useMutation('createLyrics', async (form: CreateLyricsFormProps) => {
    await LyricsClient.create(form);
    queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: addRating,
    isSuccess: isAddRatingSuccess,
    isError: isAddRatingError,
    isLoading: isAddRatingLoading,
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
    actions: {
      delete: {
        action: deleteLyrics,
        isError: isDeleteError,
        isLoading: isDeleteLoading,
        isSuccess: isDeleteSuccess,
      },
      create: {
        action: create,
        isError: isCreateError,
        isLoading: isCreateLoading,
        isSuccess: isCreateSuccess,
      },
      addRating: {
        action: addRating,
        isError: isAddRatingError,
        isLoading: isAddRatingLoading,
        isSuccess: isAddRatingSuccess,
      },
      addComment: {
        action: addComment,
        isError: isAddCommentError,
        isLoading: isAddCommentLoading,
        isSuccess: isAddCommentSuccess,
      },
      removeComment: {
        action: removeComment,
        isError: isRemoveCommentError,
        isLoading: isRemoveCommentLoading,
        isSuccess: isRemoveCommentSuccess,
      },
    },
    selectors: {
      data,
      isError,
      isLoading,
    },
  };
};

export default useLyrics;
