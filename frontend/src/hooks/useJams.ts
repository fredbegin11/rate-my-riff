import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateJamFormProps } from '../components/form/CreateJamForm';
import Jam from '../models/Jam';
import JamsClient from '../services/JamsClient';
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

interface JamsHook {
  actions: {
    delete: HookAction;
    create: HookAction;
    addRating: HookAction;
    addComment: HookAction;
    removeComment: HookAction;
  };
  selectors: {
    data: Jam[];
    isError: boolean;
    isLoading: boolean;
  };
}

const useJams = (): JamsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('jams', () => JamsClient.getAll());

  const {
    mutate: deleteJam,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useMutation('deleteJam', async (id: string) => {
    await JamsClient.delete(id);
    queryClient.invalidateQueries('jams');
  });

  const {
    mutate: create,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isLoading: isCreateLoading,
  } = useMutation('createJam', async (form: CreateJamFormProps) => {
    await JamsClient.create(form);
    queryClient.invalidateQueries('jams');
  });

  const {
    mutate: addRating,
    isSuccess: isAddRatingSuccess,
    isError: isAddRatingError,
    isLoading: isAddRatingLoading,
  } = useMutation('addJamRating', async ({ id, rating }: AddRatingProps) => {
    await JamsClient.addRating(id, rating);
    queryClient.invalidateQueries('jams');
  });

  const {
    mutate: addComment,
    isSuccess: isAddCommentSuccess,
    isError: isAddCommentError,
    isLoading: isAddCommentLoading,
  } = useMutation('addComment', async ({ id, form }: AddCommentProps) => {
    await JamsClient.addComment(id, form);
    queryClient.invalidateQueries('jams');
  });

  const {
    mutate: removeComment,
    isSuccess: isRemoveCommentSuccess,
    isError: isRemoveCommentError,
    isLoading: isRemoveCommentLoading,
  } = useMutation('removeComment', async ({ id, commentId }: RemoveCommentProps) => {
    await JamsClient.removeComment(id, commentId);
    queryClient.invalidateQueries('jams');
  });

  return {
    actions: {
      delete: {
        action: deleteJam,
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

export default useJams;
