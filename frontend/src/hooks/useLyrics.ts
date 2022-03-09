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
  id: string;
  form: CreateCommentFormProps;
}

export interface RemoveCommentProps {
  id: string;
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
    await queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: create,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isLoading: isCreateLoading,
  } = useMutation('createLyrics', async (form: CreateLyricsFormProps) => {
    await LyricsClient.create(form);
    await queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: addRating,
    isSuccess: isAddRatingSuccess,
    isError: isAddRatingError,
    isLoading: isAddRatingLoading,
  } = useMutation('addLyricsRating', async ({ id, rating }: AddRatingProps) => {
    await LyricsClient.addRating(id, rating);
    await queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: addComment,
    isSuccess: isAddCommentSuccess,
    isError: isAddCommentError,
    isLoading: isAddCommentLoading,
  } = useMutation('addComment', async ({ id, form }: AddCommentProps) => {
    await LyricsClient.addComment(id, form);
    await queryClient.invalidateQueries('lyrics');
  });

  const {
    mutate: removeComment,
    isSuccess: isRemoveCommentSuccess,
    isError: isRemoveCommentError,
    isLoading: isRemoveCommentLoading,
  } = useMutation('removeComment', async ({ id, commentId }: RemoveCommentProps) => {
    await LyricsClient.removeComment(id, commentId);
    await queryClient.invalidateQueries('lyrics');
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
