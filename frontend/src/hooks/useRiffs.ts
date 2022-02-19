import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import Instrument from '../models/Instrument';
import Riff from '../models/Riff';
import RiffsClient from '../services/RiffsClient';
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

interface RiffsHook {
  actions: {
    delete: HookAction;
    create: HookAction;
    addRating: HookAction;
    addComment: HookAction;
    removeComment: HookAction;
  };
  selectors: {
    data: Riff[];
    isError: boolean;
    isLoading: boolean;
  };
}

const useRiffs = (instrument: Instrument = 'strings'): RiffsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('riffs', () => RiffsClient.getAll());

  const {
    mutate: deleteRiff,
    isError: isDeleteError,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
  } = useMutation('deleteRiff', async (id: string) => {
    await RiffsClient.delete(id);
    queryClient.invalidateQueries('riffs');
  });

  const {
    mutate: create,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    isLoading: isCreateLoading,
  } = useMutation('createRiff', async (form: CreateRiffFormProps) => {
    await RiffsClient.create(form);
    queryClient.invalidateQueries('riffs');
  });

  const {
    mutate: addRating,
    isSuccess: isAddRatingSuccess,
    isError: isAddRatingError,
    isLoading: isAddRatingLoading,
  } = useMutation('addRiffRating', async ({ id, rating }: AddRatingProps) => {
    await RiffsClient.addRating(id, rating);
    queryClient.invalidateQueries('riffs');
  });

  const {
    mutate: addComment,
    isSuccess: isAddCommentSuccess,
    isError: isAddCommentError,
    isLoading: isAddCommentLoading,
  } = useMutation('addComment', async ({ riffId, form }: AddCommentProps) => {
    await RiffsClient.addComment(riffId, form);
    queryClient.invalidateQueries('riffs');
  });

  const {
    mutate: removeComment,
    isSuccess: isRemoveCommentSuccess,
    isError: isRemoveCommentError,
    isLoading: isRemoveCommentLoading,
  } = useMutation('removeComment', async ({ riffId, commentId }: RemoveCommentProps) => {
    await RiffsClient.removeComment(riffId, commentId);
    queryClient.invalidateQueries('riffs');
  });

  return {
    actions: {
      delete: {
        action: deleteRiff,
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
      data: data.filter((riff) => riff.instrument === instrument),
      isError,
      isLoading,
    },
  };
};

export default useRiffs;
