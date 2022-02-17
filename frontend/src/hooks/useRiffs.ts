import { UseMutateFunction, useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateCommentFormProps } from '../components/form/CreateCommentForm';
import { CreateRiffFormProps } from '../components/form/CreateRiffForm';
import Instrument from '../models/Instrument';
import Riff from '../models/Riff';
import RiffsClient from '../services/RiffsClient';

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
    deleteRiff: UseMutateFunction<void, unknown, string, unknown>;
    createRiff: UseMutateFunction<void, unknown, CreateRiffFormProps, unknown>;
    addRiffRating: UseMutateFunction<void, unknown, AddRatingProps, unknown>;
    addComment: UseMutateFunction<void, unknown, AddCommentProps, unknown>;
    removeComment: UseMutateFunction<void, unknown, RemoveCommentProps, unknown>;
  };
  selectors: {
    data: Riff[];
    isError: boolean;
    isLoading: boolean;
    isCreateRiffSuccess: boolean;
    isCreateRiffError: boolean;
    isCreateRiffLoading: boolean;
    isAddRiffRatingSuccess: boolean;
    isAddRiffRatingError: boolean;
    isAddRiffRatingLoading: boolean;
    isAddCommentSuccess: boolean;
    isAddCommentError: boolean;
    isAddCommentLoading: boolean;
    isRemoveCommentSuccess: boolean;
    isRemoveCommentError: boolean;
    isRemoveCommentLoading: boolean;
  };
}

const useRiffs = (instrument: Instrument = 'strings'): RiffsHook => {
  const queryClient = useQueryClient();
  const { data = [], isError, isLoading } = useQuery('riffs', () => RiffsClient.getAll());

  const { mutate: deleteRiff } = useMutation('deleteRiff', async (id: string) => {
    await RiffsClient.delete(id);
    queryClient.invalidateQueries('riffs');
  });

  const {
    mutate: createRiff,
    isSuccess: isCreateRiffSuccess,
    isError: isCreateRiffError,
    isLoading: isCreateRiffLoading,
  } = useMutation('createRiff', async (form: CreateRiffFormProps) => {
    await RiffsClient.create(form);
    queryClient.invalidateQueries('riffs');
  });

  const {
    mutate: addRiffRating,
    isSuccess: isAddRiffRatingSuccess,
    isError: isAddRiffRatingError,
    isLoading: isAddRiffRatingLoading,
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
    actions: { deleteRiff, createRiff, addRiffRating, addComment, removeComment },
    selectors: {
      data: data.filter((riff) => riff.instrument === instrument),
      isError,
      isLoading,
      isCreateRiffSuccess,
      isCreateRiffError,
      isCreateRiffLoading,
      isAddRiffRatingSuccess,
      isAddRiffRatingError,
      isAddRiffRatingLoading,
      isAddCommentSuccess,
      isAddCommentError,
      isAddCommentLoading,
      isRemoveCommentSuccess,
      isRemoveCommentError,
      isRemoveCommentLoading,
    },
  };
};

export default useRiffs;
